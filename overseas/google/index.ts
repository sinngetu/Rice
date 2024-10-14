import url from 'node:url'

import puppeteer, { Browser, Page } from 'puppeteer'
import dayjs from 'dayjs'

import config from '../../config'
import { getHash, deduplicate, model } from '../../utils'
import { News } from '../../interface'

import ignore from './ignore.json' assert { type: 'json' }

interface RawNews {
    link: string
    title: string
    date: string
    keyword: string
    status: number
    medium?: number
}

export default async function () {
    const media = await model.media.getMedia()
    const news: RawNews[][] = []
    const urls = (await model.keyword.getKeyword.All())
        .filter(({ type }) => type === 3 || type === 4)
        .map(({ type, word, extend }) => ({ status: type - 3, keyword: word, url: extend }))

    const getPage = await (async () => {
        let browser: Browser
        let page: Page

        const max = 25
        let counter = max
        return async (close: boolean = false) => {
            if(close) {
                await browser.close()
                return page
            }

            if(++counter > max) {
                if (browser) {
                    await browser.close()
                    await new Promise(r => setTimeout(r, 1000))
                }

                browser = await puppeteer.launch({ headless: !config.DEV, defaultViewport: null })
                page = await browser.newPage()
                counter = 0
            }

            return page
        }
    })()

    let counter = 0
    for(const item of urls) {
        const { status, keyword, url } = item
        const page = await getPage()
        let reloadTimes = config.PageReloadTimes

        try {
            await page.goto(url!, { timeout: 0, waitUntil: 'networkidle2' })
        } catch(e) {
            if(reloadTimes-- !== 0) {
                await new Promise(r => setTimeout(r, 1000))
                await page.reload({ timeout: 0, waitUntil: 'networkidle2' })
            }
        }

        news.push((await page.evaluate(() => {
            let list = document.querySelectorAll('#rso .SoaBEf')

            return Array.from(list).map(el => {
                const link = el.querySelector('a')?.href
                // const medium = el.querySelector('.NUnG9d span')?.innerHTML
                const title = el.querySelector('.MBeuO')?.innerHTML
                const date = el.querySelector('.rbYSKb span')?.innerHTML

                if (link === undefined || title === undefined || date === undefined)
                    throw new Error('Page info capture missing!')

                return ({ link, title, date, keyword: '--' } as RawNews)
            })
        })).map(i => ({ ...i, keyword, status})))

        counter++
        await new Promise(r => setTimeout(r, 500))
    }

    let rawData = news.flat()

    // 媒体名统一
    rawData.forEach(async item => {
        const host = url.parse(item.link).host || ''
        const pass = ignore.reduce((result, ignore) => result || host.includes(ignore), false)

        item.medium = pass ? 0 : (media.reduce((result, medium) => host.includes(medium.domain) ? medium.id : result, 0))
    })
 
    // 剔除非清单媒体信息
    let data = rawData.filter(({ medium }) => !!medium).map(({ link, title, date, medium, keyword, status }) => ({
        link,
        title,
        medium,
        status,
        date: getDate(date),
        hash: getHash(medium as number, link),
        tags: '',
        keyword,
    } as News))

    data = await deduplicate(data)

    // 标题补全
    // await Promise.all(data.map(item => new Promise(async (resolve) => {
    //     const page = await browser.newPage()

    //     try {
    //         await page.goto(item.link, { timeout: 0 })
    //         item.title = await page.evaluate(() => document.title)
    //     } catch(e) {}

    //     resolve(undefined)
    // })))

    await getPage(true)
    return data
}

function getDate(info: string) {
    // const [_, num, unit] = /^([0-9]*)\s(.*)前$/.exec(info) || []

    // return dayjs().subtract(unit === '分钟' ? Number(num) : 0, 'minute').format('YYYY-MM-DD HH:mm:00')
    return dayjs().format('YYYY-MM-DD HH:mm:00')
}

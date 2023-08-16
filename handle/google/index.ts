import url from 'node:url'

import { Browser } from 'puppeteer'
import dayjs from 'dayjs'

import { getHash, deduplicate, model } from '../utils'
import { New } from '../interface'

import urls from './urls.json' assert { type: 'json' }
import ignore from './ignore.json' assert { type: 'json' }

interface RawNew {
    link: string
    title: string
    date: string
    medium?: number
}

export default async function (browser: Browser) {
    const page = await browser.newPage()
    const media = await model.media.getMedia()

    const news: RawNew[][] = []

    for(const url of urls) {
        await page.goto(url)

        news.push(await page.evaluate(() => {
            let list = document.querySelectorAll('#rso .SoaBEf')

            return Array.from(list).map(el => {
                const link = el.querySelector('a')?.href
                // const medium = el.querySelector('.NUnG9d span')?.innerHTML
                const title = el.querySelector('.MBeuO')?.innerHTML
                const date = el.querySelector('.rbYSKb span')?.innerHTML

                if (link === undefined || title === undefined || date === undefined)
                    throw new Error('Page info capture missing!')

                return ({ link, title, date } as RawNew)
            })
        }))

        await new Promise(r => setTimeout(r, 500))
    }

    await page.close()

    let rawData = news.flat()

    // 媒体名统一
    rawData.forEach(async item => {
        const host = url.parse(item.link).host || ''
        const pass = ignore.reduce((result, ignore) => result || host.includes(ignore), false)

        item.medium = pass ? 0 : (media.reduce((result, medium) => host.includes(medium.domain) ? medium.id : result, 0))
    })
 
    // 剔除非清单媒体信息
    let data = rawData.filter(({ medium }) => !!medium).map(({ link, title, date, medium }) => ({
        link,
        title,
        medium,
        date: getDate(date),
        hash: getHash(medium as number, title),
        tags: '',
        status: 0
    } as New))

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

    return data
}

function getDate(info: string) {
    // const [_, num, unit] = /^([0-9]*)\s(.*)前$/.exec(info) || []

    // return dayjs().subtract(unit === '分钟' ? Number(num) : 0, 'minute').format('YYYY-MM-DD HH:mm:00')
    return dayjs().format('YYYY-MM-DD HH:mm:00')
}

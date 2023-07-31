import url from 'node:url'
import { createHash } from 'node:crypto'
import puppeteer, { PuppeteerLaunchOptions } from 'puppeteer'
import dayjs from 'dayjs'

import config from './config'
import db from './db'
import { New, RawNew } from './interface'

import urls from './urls.json' assert { type: 'json' }
import media from './media.json' assert { type: 'json' }
import ignore from './ignore.json' assert { type: 'json' }

(async () => {
    const option = config.DEV ? ({
        headless: false,
        // slowMo: 500
    } as PuppeteerLaunchOptions) : undefined

    const browser = await puppeteer.launch(option)
    const page = await browser.newPage()
    config.DEV && await page.setViewport({ width: 1080, height: 1024 })

    const news: RawNew[][] = []

    for(const url of urls) {
        await page.goto(url)

        news.push(await page.evaluate(() => {
            let list = document.querySelectorAll('#rso .SoaBEf')

            return Array.from(list).map(el => {
                const link = el.querySelector('a')?.href
                const medium = el.querySelector('.NUnG9d span')?.innerHTML
                const title = el.querySelector('.MBeuO')?.innerHTML
                const date = el.querySelector('.rbYSKb span')?.innerHTML

                if (link === undefined || medium === undefined || title === undefined || date === undefined)
                    throw new Error('Page info capture missing!')

                return ({ link, medium, title, date } as RawNew)
            })
        }))
    }

    await db.connect()

    let data = news.flat().map(({ link, title, medium, date }) => ({
        link,
        title,
        medium,
        date: getDate(date),
        hash: md5(`${medium}-${title}`),
        tags: '',
        status: 0
    } as New))

    data.forEach(item => {
        const host = url.parse(item.link).host || ''
        const pass = ignore.reduce((result, ignore) => result || host.includes(ignore), false)

        item.medium = pass ? '' : (media.reduce((result, medium) => host.includes(medium.domain) ? medium.name : result, ''))
    })

    data = data.filter(({ medium }) => !!medium)

    const existHash = ((await db.query(db.condition({
        hash: data.reduce((result, item) => [...result, item.hash], ([] as string[]))
    }))) as New[]).map(i => i.hash)

    const markHash = new Set()

    data = data.filter(({ hash }) => {
        if (existHash.includes(hash)) return false
        if (markHash.has(hash)) return false

        markHash.add(hash)
        return true
    })

    await db.add(data)
    await db.close()
    await browser.close()
    process.exit(0)
})()

function md5(content: string) { return createHash('md5').update(content).digest('hex') }

function getDate(info: string) {
    const [_, num, unit] = /^([0-9]*)\s(.*)前$/.exec(info) || []

    return dayjs().subtract(unit === '分钟' ? Number(num) : 0, 'minute').format('YYYY-MM-DD HH:mm:00')
}

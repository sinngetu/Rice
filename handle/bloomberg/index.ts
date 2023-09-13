import url from 'node:url'
import { Browser } from 'puppeteer'
import dayjs from 'dayjs'

import { getHash, deduplicate, model } from '../utils'
import { New } from '../interface'

import urls from './urls.json' assert { type: 'json' }

interface RawNew {
    link: string
    title: string
}

const domain = 'bloomberg.com'

export default async function(browser: Browser) {
    const media = await model.media.getMedia()
    const medium = media.reduce((result, medium) => domain === medium.domain ? medium.id : result, 0)

    const news: RawNew[][] = await Promise.all(urls.map(async url => {
        const page = await browser.newPage()
        await page.goto(url, { timeout: 0 })

        const data = await page.evaluate(() => (Array.from(document.querySelectorAll('div[data-component="headline"] a')) as HTMLLinkElement[]).map(a => ({
            link: a.href,
            title: a.innerText
        })))

        await page.close()
        return data
    }))

    const dateRegexp = /^20[0-9]{2}-[0-9]{2}-[0-9]{2}$/
    let data: New[] = news.flat().filter(({ link }) => dateRegexp.test(url.parse(link).path?.split('/')[3] || '')).map(({ link, title }) => ({
        link,
        title,
        medium,
        hash: getHash(medium, title),
        date: dayjs().format('YYYY-MM-DD HH:mm:00'),
        tags: '',
        status: 0,
        keyword: '--',
    }))

    return await deduplicate(data)
}

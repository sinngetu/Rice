import { Browser } from 'puppeteer'
import dayjs from 'dayjs'

import { getHash, deduplicate, model } from '../../utils'
import { News } from '../../interface'

import urls from './urls.json' assert { type: 'json' }

interface RawNews {
    link: string
    title: string
}

const domain = 'nytimes.com'

export default async function(browser: Browser) {
    const media = await model.media.getMedia()
    const medium = media.reduce((result, medium) => domain === medium.domain ? medium.id : result, 0)

    /** open all pages **/
    const news: RawNews[][] = await Promise.all(urls.map(async url => {
        const page = await browser.newPage()

        await page.goto(url, { timeout: 0, waitUntil: 'domcontentloaded' })

        const data = await page.evaluate(() => (Array.from(document.querySelectorAll('h3 a')) as HTMLLinkElement[]).map(a => ({
            link: a.href,
            title: a.innerText
        })))

        await page.close()
        return data
    }))

    let data: News[] = news.flat().map(({ link, title }) => ({
        link,
        title,
        medium,
        hash: getHash(medium, link),
        date: dayjs().format('YYYY-MM-DD HH:mm:00'),
        tags: '',
        status: 0,
        keyword: '--',
    }))

    return await deduplicate(data)
}

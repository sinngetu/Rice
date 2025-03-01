import url from 'node:url'
import { Browser } from 'puppeteer'
import dayjs from 'dayjs'

import config from '../../config'
import { getHash, deduplicate, model } from '../../utils'
import { News } from '../../interface'

import urls from './urls.json' assert { type: 'json' }

interface RawNews {
    link: string
    title: string
}

const domain = 'bloomberg.com'

export default async function(browser: Browser) {
    const media = await model.media.getMedia()
    const medium = media.reduce((result, medium) => domain === medium.domain ? medium.id : result, 0)

    const news: RawNews[][] = await Promise.all(urls.map(async url => {
        const page = await browser.newPage()
        let reloadTimes = config.PageReloadTimes

        try {
            await page.goto(url, { timeout: 0, waitUntil: 'networkidle2' })
        } catch(e) {
            if(reloadTimes-- !== 0) {
                await new Promise(r => setTimeout(r, 1000))
                await page.reload({ timeout: 0, waitUntil: 'networkidle2' })
            }
        }

        const data = await page.evaluate(() => (Array.from(document.querySelectorAll('#filter_latest a.LineupContentArchiveFiltered_storyLink__cz5Qc')) as HTMLLinkElement[]).map(a => ({
            link: a.href.split('?')[0],
            title: (a.getElementsByClassName('Headline_large__BPshg')[0] as HTMLDivElement)?.innerText
        })))

        await page.close()
        return data
    }))

    const dateRegexp = /^20[0-9]{2}-[0-9]{2}-[0-9]{2}$/
    let data: News[] = news.flat().filter(({ link }) => dateRegexp.test(url.parse(link).path?.split('/')[3] || '')).map(({ link, title }) => ({
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

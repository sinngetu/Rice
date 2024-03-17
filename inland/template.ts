import url from 'node:url'
import dayjs from 'dayjs'
import type { Browser, WaitForOptions } from 'puppeteer'

import { getHash, deduplicate, model } from '../utils'
import { News } from '../interface'

export interface RawNews {
    link: string
    title: string
    allowLinkRepeta?: boolean
}

export default (
    link: string,
    getNews: () => RawNews[],
    waitUntil: WaitForOptions['waitUntil'] = 'networkidle2',
) => async (browser: Browser) => {
    const { host } = url.parse(link)
    let data: News[]

    try {
        const media = await model.media.getMedia()
        const medium = media.reduce((result, medium) => host === medium.domain ? medium.id : result, 0)
        const page = await browser.newPage()

        await page.goto(link, { timeout: 0, waitUntil })

        const mark = {} as { [link: string]: boolean }
        const news: RawNews[] = (await page.evaluate(getNews)).filter(item => {
            if (!item.title || !item.title.trim()) return false
            if (mark[item.link] && !item.allowLinkRepeta) return false

            mark[item.link] = true
            return true
        })

        await page.close()

        data = news.flat().map(({ link, title }) => ({
            link,
            title: title.split('/n')[0],
            medium,
            hash: getHash(medium, link),
            date: dayjs().format('YYYY-MM-DD HH:mm:00'),
            tags: '',
            status: 2,
            keyword: '--',
        }))
    } catch(e) { data = [] }

    return await deduplicate(data)
}

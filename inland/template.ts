import url from 'node:url'
import { Browser } from 'puppeteer'
import dayjs from 'dayjs'

import { getHash, deduplicate, model } from '../utils'
import { News } from '../interface'

interface RawNews {
    link: string
    title: string
}

export default (link: string, getNews: () => RawNews[]) => async (browser: Browser) => {
    const { host } = url.parse(link)
    let data: News[]

    try {
        const media = await model.media.getMedia()
        const medium = media.reduce((result, medium) => host === medium.domain ? medium.id : result, 0)
        const page = await browser.newPage()

        await page.goto(link, { timeout: 0, waitUntil: 'networkidle2' })

        const mark = {} as { [link: string]: boolean }
        const news: RawNews[] = (await page.evaluate(getNews)).filter(item => {
            if (!item.title || !item.title.trim()) return false
            if (mark[item.title]) return false

            mark[item.title] = true
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
            status: 0,
            keyword: '--',
        }))
    } catch(e) { data = [] }

    return await deduplicate(data)
}

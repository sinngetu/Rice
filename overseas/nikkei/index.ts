import { Browser } from 'puppeteer'
import dayjs from 'dayjs'

import { getHash, deduplicate, model } from '../../utils'
import { News } from '../../interface'

import urls from './urls.json' assert { type: 'json' }

interface RawNews {
    isCN: boolean
    link: string
    title: string
}

const domain = 'nikkei.com'

export default async function(browser: Browser) {
    let data: News[]

    try {
        const media = await model.media.getMedia()
        const medium = media.reduce((result, medium) => domain === medium.domain ? medium.id : result, 0)

        const news: RawNews[][] = await Promise.all(urls.map(async url => {
            const page = await browser.newPage()

            await page.goto(url, { timeout: 0 })

            const data = await page.evaluate(() => {
                const isCN = window.location.host === 'cn.nikkei.com'
                const CNQuery = '.newsStyle03 dl.newsContent02 dt a'
                const MainQuery = '.card-article__headline a'

                return (Array.from(document.querySelectorAll(isCN ? CNQuery : MainQuery)) as HTMLLinkElement[]).map(a => ({
                    isCN,
                    link: a.href.split('?')[0],
                    title: a.innerText
                }))
            })

            await page.close()
            return data
        }))

        data = news.flat().map(({ link, title }) => ({
            link,
            title,
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

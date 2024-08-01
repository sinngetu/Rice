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

const CNDomain = 'ftchinese.com'
const MainDomain = 'ft.com'

export default async function(browser: Browser) {
    let data: News[]

    try {
        const media = await model.media.getMedia()
        const CNMedium = media.reduce((result, medium) => CNDomain === medium.domain ? medium.id : result, 0)
        const MainMedium = media.reduce((result, medium) => MainDomain === medium.domain ? medium.id : result, 0)

        const news: RawNews[][] = await Promise.all(urls.map(async url => {
            const page = await browser.newPage()

            await page.goto(url, { timeout: 0, waitUntil: 'networkidle2' })

            const data = await page.evaluate(() => {
                const isCN = window.location.host === 'm.ftchinese.com'
                const CNQuery = 'a.item-headline-link'
                const MainQuery = 'a.js-teaser-heading-link'

                return (Array.from(document.querySelectorAll(isCN ? CNQuery : MainQuery)) as HTMLLinkElement[]).map(a => ({
                    isCN,
                    link: a.href.split('?')[0],
                    title: a.innerText
                }))
            })

            await page.close()
            return data
        }))

        data = news.flat().map(({ isCN, link, title }) => ({
            link,
            title,
            medium: isCN ? CNMedium : MainMedium,
            hash: getHash(isCN ? CNMedium : MainMedium, link),
            date: dayjs().format('YYYY-MM-DD HH:mm:00'),
            tags: '',
            status: 0,
            keyword: '--',
        }))
    } catch(e) { data = [] }

    return await deduplicate(data)
}

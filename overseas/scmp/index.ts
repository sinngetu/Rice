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

const domain = 'scmp.com'

export default async function(browser: Browser) {
    let data: News[]

    try {
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

            const data = await page.evaluate(() => {
                const query = 'div[data-qa="ContentItemLivePrimary-Headline"]>a'

                return (Array.from(document.querySelectorAll(query)) as HTMLLinkElement[]).map(a => ({
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

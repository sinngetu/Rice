import url from 'node:url'
import { Browser, Page } from 'puppeteer'
import dayjs from 'dayjs'

import { getHash, deduplicate, model } from '../utils'
import { New } from '../interface'

import urls from './urls.json' assert { type: 'json' }

interface RawNew {
    link: string
    title: string
}

const domain = 'reuters.com'

export default async function(browser: Browser) {
    const media = await model.media.getMedia()
    const medium = media.reduce((result, medium) => domain === medium.domain ? medium.id : result, 0)

    /** only one page **/
    // const page = await browser.newPage()
    // const news: RawNew[][] = []

    // for (const url of urls) {
    //     await page.goto(url, { timeout: 0, waitUntil: 'domcontentloaded' })

    //     news.push(await page.evaluate(() => ([
    //         Array.from(document.querySelectorAll('h3[data-testid="Heading"] a')),
    //         Array.from(document.querySelectorAll('a[data-testid="Heading"]'))
    //     ].flat() as HTMLLinkElement[]).map(a => ({
    //         link: a.href,
    //         title: a.innerText
    //     }))))
    // }



    /** multiple page **/
    // const pagesNum = 3
    // const taskList = [...urls]
    // const news: RawNew[][] = []

    // await Promise.all(new Array(pagesNum).fill(undefined).map(() => new Promise(async resolve => task(await browser.newPage(), taskList, news, resolve))))



    /** open all pages **/
    const news: RawNew[][] = await Promise.all(urls.map(async url => {
        const page = await browser.newPage()

        await page.goto(url, { timeout: 0, waitUntil: 'domcontentloaded' })

        const data = await page.evaluate(() => ([
            Array.from(document.querySelectorAll('h3[data-testid="Heading"] a')),
            Array.from(document.querySelectorAll('a[data-testid="Heading"]'))
        ].flat() as HTMLLinkElement[]).map(a => ({
            link: a.href,
            title: a.innerText
        })))

        await page.close()
        return data
    }))




    let data: New[] = news.flat().map(({ link, title }) => ({
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

// async function task(page: Page, tasks: string[], container: RawNew[][], cb: (arg: any) => void) {
//     if (!tasks.length) return cb(await page.close())

//     await page.goto((tasks.shift() as string), { timeout: 0 })

//     container.push(await page.evaluate(() => ([
//         Array.from(document.querySelectorAll('h3[data-testid="Heading"] a')),
//         Array.from(document.querySelectorAll('a[data-testid="Heading"]'))
//     ].flat() as HTMLLinkElement[]).map(a => ({
//         link: a.href,
//         title: a.innerText
//     }))))

//     task(page, tasks, container, cb)
// }

import puppeteer, { Browser } from 'puppeteer'
import dayjs from 'dayjs'

import { Record } from './interface'
import { deduplicate, getHash } from './utils'

// export default async function (browser: Browser) {
async function X(browser: Browser) {
    const page = await browser.newPage()
    const info = [] as { content: string, link: string }[][]

    const getInfo = () => {
        const contents = (Array.from(document.querySelectorAll('div[data-testid="tweetText"]')) as HTMLDivElement[]).map(el => el.innerText)
        const links = (Array.from(document.querySelectorAll('div[data-testid="User-Name"] a[dir="ltr"]')) as HTMLLinkElement[]).map(a => a.href)

        return contents.map((content, i) => ({ content, link: links[i] }))
    }

    await page.goto('https://twitter.com/search?q=%E9%A9%AC%E4%BA%91&src=typed_query&f=live')
    info.push(await page.evaluate(getInfo))

    await new Promise(r => setTimeout(r, 10000))
    // await page.goto('https://twitter.com/search?q=jack%20ma&src=typed_query&f=live')
    // info.push(await page.evaluate(getInfo))

    const data = info.flat().map(item => ({
        ...item,
        hash: getHash(item.link),
        date: dayjs().format('YYYY-MM-DD HH:mm:00')
    } as Record))

    return deduplicate(data)
}

(async () => {
    await X(await puppeteer.launch({ headless: false, defaultViewport: null }))
})()
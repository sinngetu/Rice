import { Browser } from 'puppeteer'
import dayjs from 'dayjs'

import { deduplicate, getHash } from '../../utils'

export default async function (browser: Browser) {
    const medium = 99998
    const page = await browser.newPage()

    await page.goto('https://www.thecfa.cn/gfgg/index.html', { timeout: 0, waitUntil: 'domcontentloaded' })
    const proclaim = await page.evaluate(() => (Array.from(document.querySelectorAll('.content ul li.clear a')) as HTMLLinkElement[]).map(el => ({
        title: el.innerText.trim(),
        link: el.href
    })))

    await page.goto('https://www.thecfa.cn/xwzx/index.html', { timeout: 0, waitUntil: 'domcontentloaded' })
    const news = await page.evaluate(() => (Array.from(document.querySelectorAll('.content ul.clear li h2 a')) as HTMLLinkElement[]).map(el => ({
        title: el.innerText.trim(),
        link: el.href
    })))

    const data = [...proclaim, ...news].map(item => ({
        ...item,
        medium,
        hash: getHash(medium, item.link),
        date: dayjs().format('YYYY-MM-DD HH:mm:00'),
        tags: '',
        status: 1,
        keyword: '--',
    }))

    return await deduplicate(data)
}
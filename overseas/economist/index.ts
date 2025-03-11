import { Browser } from 'puppeteer'
import dayjs from 'dayjs'

import { getHash, deduplicate, model } from '../../utils'
import { News } from '../../interface'

const domain = 'economist.com'

export default async function(browser: Browser) {
    const media = await model.media.getMedia()
    const medium = media.reduce((result, medium) => domain === medium.domain ? medium.id : result, 0)
    const now = dayjs()

    // on Thursdays only
    if(now.day() !== 4 && now.day() !== 5) return []

    const todayURL = `https://www.economist.com/weeklyedition/${now.format('YYYY-MM-DD')}`
    const tomorrowURL = `https://www.economist.com/weeklyedition/${now.add(1, 'day').format('YYYY-MM-DD')}`

    const page = await browser.newPage()

    try {
        await page.goto(todayURL, { timeout: 5000, waitUntil: 'networkidle2' })
    } catch(e) {}

    let hasData = await page.evaluate(() => document.querySelector('img.ds-missed-target__illustration') === null)
    if (!hasData) {
        try {
            await page.goto(tomorrowURL, { timeout: 5000, waitUntil: 'networkidle2' })
        } catch(e) {}
    }

    hasData = await page.evaluate(() => document.querySelector('img.ds-missed-target__illustration') === null)
    const news = hasData ? await page.evaluate(() => (Array.from(document.querySelectorAll('h3.e7j57mt0 a')) as HTMLLinkElement[]).map(a => ({
        link: a.href,
        title: a.innerText
    }))) : []

    await page.close()

    let data: News[] = news.map(({ link, title }) => ({
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

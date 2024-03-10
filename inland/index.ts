import puppeteer, { Browser } from 'puppeteer'
import config from '../config'

import landian from './www.landiannews.com'
import people from './www.people.com.cn'
import ennews from './www.ennews.com'
import eeo from './www.eeo.com.cn'
import zol from './news.zol.com.cn'
import forbes from './www.forbeschina.com'
import news from './www.news.cn'
import thepaper from './www.thepaper.cn'

const website = async (browser: Browser) => {
    const data = [
        await landian(browser),
        await people(browser),
        await ennews(browser),
        await eeo(browser),
        await zol(browser),
        await forbes(browser),
        await news(browser),
        await thepaper(browser),
    ]

    return data.flat()
}

export default async () => {
    const browser = await puppeteer.launch({ headless: !config.DEV, defaultViewport: null })
    const data = await website(browser)

    await browser.close()
    return data
}

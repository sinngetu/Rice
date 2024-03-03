import puppeteer, { Browser } from 'puppeteer'

import config from '../config'

const website = async (browser: Browser) => {
    const data = [
        []
        // await (browser),
    ]

    return data.flat()
}

export default async () => {
    const browser = await puppeteer.launch({ headless: !config.DEV, defaultViewport: null })
    const data = await website(browser)

    await browser.close()
    return data
}

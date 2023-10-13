import puppeteer, { Browser } from 'puppeteer'

import google from './google'
import bloomberg from './bloomberg'
import reuters from './reuters'

import config from '../config'

const website = async (browser: Browser) => {
    const data = [
        await bloomberg(browser),
        await reuters(browser),
    ]

    await browser.close()
    return data.flat()
}

export default async () => {
    const browser = await puppeteer.launch({ headless: !config.DEV, defaultViewport: null })
    const data = await Promise.all([google(), website(browser)]).then(data => data.flat())

    await browser.close()
    return data
}

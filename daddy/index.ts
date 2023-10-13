import puppeteer from 'puppeteer'

import google from './google'
// import X from './X'

import config from '../config'

export default async () => {
    const browser = await puppeteer.launch({ headless: !config.DEV, defaultViewport: null })
    const data = await Promise.all([google(browser)]).then(data => data.flat())

    await browser.close()
    return data
}

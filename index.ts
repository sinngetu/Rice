import puppeteer from 'puppeteer'

import * as model from './model'
import handle from './handle'
import config from './config'

(async () => {
    const browser = await puppeteer.launch({ headless: !config.DEV, defaultViewport: null })
    const data = await handle(browser)

    await model.news.saveNews(data)
    console.log(`\nadd ${data.length} records\n`)

    await model.close()
    await browser.close()
    process.exit(0)
})()

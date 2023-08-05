import puppeteer from 'puppeteer'

import * as model from './model'
import handle from './handle'

(async () => {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null })
    const data = await handle(browser)

    await model.news.saveNews(data)
    console.log(`\n\nadd ${data.length} records\n\n`)

    await model.close()
    await browser.close()
    process.exit(0)
})()

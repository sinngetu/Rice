import puppeteer from 'puppeteer'

import db from './db'
import handle from './handle'

(async () => {
    await db.connect()

    const browser = await puppeteer.launch({ headless: false })
    const data = await handle(browser)

    await db.add(data)
    await db.close()
    await browser.close()
    process.exit(0)
})()

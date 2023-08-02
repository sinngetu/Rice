import puppeteer from 'puppeteer'

import db from './db'
import handle from './handle/bloomberg'

(async () => {
    await db.connect()

    const browser = await puppeteer.launch({ headless: false })
    const data = await handle(browser)

    console.log(data)
    // await db.add(data)
    await db.close()
    await browser.close()
    process.exit(0)
})()

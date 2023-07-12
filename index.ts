import { writeFileSync } from 'node:fs'
import puppeteer, { PuppeteerLaunchOptions } from 'puppeteer'

const config = require('./config')

(async () => {
    const option = config.DEV ? ({
        headless: false,
        slowMo: 500
    } as PuppeteerLaunchOptions) : undefined

    const browser = await puppeteer.launch(option)
    const page = await browser.newPage()

    await page.goto('https://www.google.com.hk/search?q=jack+ma&newwindow=1&client=safari&rls=en&tbm=nws&sxsrf=AJOqlzXgtmlPkxSehN3BfBkZFGGoQXE2yA:1679397384384&source=lnt&tbs=qdr:h&sa=X&ved=2ahUKEwj-paHk8uz9AhX2S2wGHduQBqcQpwV6BAgBEBU&biw=1440&bih=789&dpr=2')

    config.DEV && await page.setViewport({ width: 1080, height: 1024 })

    const data = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('#rso .SoaBEf')).map(el => {
            const link = el.querySelector('a')?.href
            const medium = el.querySelector('.NUnG9d span')?.innerHTML
            const title = el.querySelector('.MBeuO')?.innerHTML
            const time = el.querySelector('.rbYSKb span')?.innerHTML

            if (link === undefined || medium === undefined || title === undefined || time === undefined)
                throw new Error('Page info capture failed!')

            return { link, medium, title, time }
        })
    })

    writeFileSync(config.exportFile, JSON.stringify(data), 'utf8')

    await browser.close()
})()

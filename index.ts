import puppeteer from 'puppeteer'

import * as model from './model'
import handle from './handle'
import daddy from './daddy'

(async () => {
    const news = await handle()
    await model.news.saveNews(news)
    console.log(`\nadd ${news.length} news`)

    const daddyInfo = await daddy()
    await model.daddy.saveInfo(daddyInfo)
    console.log(`add ${daddyInfo.length} daddy info\n`)

    await model.close()
    process.exit(0)
})()

import puppeteer from 'puppeteer'

import * as model from './model'
import handle from './handle'
import daddy from './daddy'
import BigNews from './BigNews'

(async () => {
    const news = await handle()
    await model.news.saveNews(news)
    console.log(`\nadd ${news.length} news`)

    const daddyInfo = await daddy()
    await model.daddy.saveInfo(daddyInfo)
    console.log(`add ${daddyInfo.length} daddy info\n`)

    await model.close()
    BigNews(news)
    process.exit(0)
})()

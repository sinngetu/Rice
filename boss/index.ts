import puppeteer from 'puppeteer'

import google from './google'
// import X from './X'

import config from '../config'
import * as model from '../model'
import BigNews from '../big-news'

export default async () => {
    const browser = await puppeteer.launch({ headless: !config.DEV, defaultViewport: null })
    const data = await Promise.all([google(browser)]).then(data => data.flat())

    await model.boss.saveInfo(data)
    await BigNews(data.map(item => ({
        link: item.link,
        hash: item.hash,
        title: item.content,
        medium: 0,
        date: item.date,
        tags: '',
        status: 0,
        keyword: ''
    })))

    console.log(`add ${data.length} boss info\n`)
    await browser.close()
}

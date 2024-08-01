import puppeteer, { Browser } from 'puppeteer'

import google from './google'

import bloomberg from './bloomberg'
import reuters from './reuters'
import wsj from './wsj'
import ft from './ft'
import nytimes from './nytimes'
import nikkei from './nikkei'
import scmp from './scmp'
import football from './football'

import config from '../config'
import * as model from '../model/'
import { News } from '../interface'

const save = async (data: News[], info: string = '') => {
    if (data.length === 0)
        return console.log(`${info} no new addtions`)

    try {
        await model.news.saveNews(data)
        console.log(`add ${data.length} ${info} news`)
    } catch(e) {
        console.log(`${info} news save error!`)
    }
}

const website = async (browser: Browser) => {
    await save(await bloomberg(browser), 'bloomberg')
    await save(await reuters(browser), 'reuters')
    await save(await wsj(browser), 'wsj')
    await save(await ft(browser), 'ft')
    await save(await nytimes(browser), 'nytimes')
    await save(await nikkei(browser), 'nikkei')
    await save(await scmp(browser), 'scmp')
    await save(await football(browser), 'football')
}

export default async () => {
    const browser = await puppeteer.launch({ headless: !config.DEV, defaultViewport: null })

    await Promise.all([
        google().then(data => save(data, 'google')),
        website(browser)
    ])

    await browser.close()
}

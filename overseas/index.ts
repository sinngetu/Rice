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
import { saveNews } from '../utils'
import BigNews from '../big-news'

const website = async (browser: Browser) => {
    const _bloomberg = await bloomberg(browser)
    await saveNews(_bloomberg, 'bloomberg')

    const _reuters = await reuters(browser)
    await saveNews(_reuters, 'reuters')

    const _wsj = await wsj(browser)
    await saveNews(_wsj, 'wsj')

    const _ft = await ft(browser)
    await saveNews(_ft, 'ft')

    const _nytimes = await nytimes(browser)
    await saveNews(_nytimes, 'nytimes')

    const _nikkei = await nikkei(browser)
    await saveNews(_nikkei, 'nikkei')

    const _scmp = await scmp(browser)
    await saveNews(_scmp, 'scmp')

    const _football = await football(browser)
    await saveNews(_football, 'football')

    return [
        _bloomberg,
        _reuters,
        _wsj,
        _ft,
        _nytimes,
        _nikkei,
        _scmp,
        _football
    ].flat().filter(data => !!data)
}

export default async () => {
    try {
        const browser = await puppeteer.launch({ headless: !config.DEV, defaultViewport: null })
    
        await Promise.all([
            google().then(data => saveNews(data, 'google')),
            website(browser).then(async data => await BigNews(data))
        ])
    
        await browser.close()
    } catch (e) { console.error(e) }
}

import { Browser } from 'puppeteer'

import google from './google'
import bloomberg from './bloomberg'
import reuters from './reuters'

const website = async (browser: Browser) => {
    const data = [
        await bloomberg(browser),
        await reuters(browser),
    ]

    await browser.close()
    return data.flat()
}

export default async (browser: Browser) => Promise.all([google(), website(browser)]).then(data => data.flat())

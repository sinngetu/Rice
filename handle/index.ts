import { Browser } from 'puppeteer'

import google from './google'
import bloomberg from './bloomberg'
import reuters from './reuters'

export default async (browser: Browser) => [
    await google(browser),
    await bloomberg(browser),
    await reuters(browser)
].flat()

// export default async (browser: Browser) => Promise.all([
//     google(browser),
//     bloomberg(browser)
// ]).then(data => data.flat())

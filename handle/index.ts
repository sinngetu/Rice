import { Browser } from 'puppeteer'

import google from './google'
import bloomberg from './bloomberg'

export default async (browser: Browser) => [
    await google(browser),
    await bloomberg(browser)
].flat()

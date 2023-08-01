import { Browser } from 'puppeteer'

import google from './google'

export default async (browser: Browser) => [
    await google(browser)
].flat()

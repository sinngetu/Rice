import { Browser } from 'puppeteer'
import dayjs from 'dayjs'

import { Record } from './interface'
import { deduplicate, getHash } from './utils'

export default async function (browser: Browser) {
    const page = await browser.newPage()
    const info = [] as { content: string, link: string }[][]

    const getInfo = () => {
        let list = document.querySelectorAll('#rso .SoaBEf')

        return Array.from(list).map(el => {
            const link = el.querySelector('a')?.href
            const content = el.querySelector('.MBeuO')?.innerHTML

            if (link === undefined || content === undefined)
                throw new Error('Page info capture missing!')

            return ({ link, content })
        })
    }

    await page.goto('https://www.google.com/search?q=%E9%A9%AC%E4%BA%91&newwindow=1&tbm=nws&sxsrf=AJOqlzVZdxSHyHxrnZVzh_ZyBnbSnaps2w:1679397384137&source=lnt&tbs=qdr:h&sa=X&ved=2ahUKEwiDiJLk8uz9AhX6T2wGHW8gBYQQpwV6BAgCEBs&biw=1440&bih=789&dpr=2&num=50')
    info.push(await page.evaluate(getInfo))
    await page.goto('https://www.google.com/search?q=jack+ma&newwindow=1&client=safari&rls=en&tbm=nws&sxsrf=AJOqlzXgtmlPkxSehN3BfBkZFGGoQXE2yA:1679397384384&source=lnt&tbs=qdr:h&sa=X&ved=2ahUKEwj-paHk8uz9AhX2S2wGHduQBqcQpwV6BAgBEBU&biw=1440&bih=789&dpr=2&num=50')
    info.push(await page.evaluate(getInfo))

    const data = info.flat().map(item => ({
        ...item,
        type: 0,
        hash: getHash(item.link),
        date: dayjs().format('YYYY-MM-DD HH:mm:00')
    } as Record))

    return deduplicate(data)
}

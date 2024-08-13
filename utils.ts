import { createHash } from 'node:crypto'
import dayjs from 'dayjs'
import { News } from './interface'
import * as model from './model'
import conf from './config'

export * as model from './model'
export function md5(content: string) { return createHash('md5').update(content).digest('hex') }
export function getHash(medium: number, url: string, title: string = '') { return md5(`${medium}-${url}${'-'+title}`) }
export function now(platform: number) { return dayjs().format('YYYY-MM-DD HH:mm:') + (platform > 9 ? '' : '0') + platform }
export async function deduplicate(data: News[]) {
    const existHash = (await model.news.getNews.ByHash(data.reduce((result, item) => result.concat(item.hash), ([] as string[]))) as News[]).map(i => i.hash)
    const markHash = new Set()

    return data.filter(({ hash }) => {
        if (existHash.includes(hash)) return false
        if (markHash.has(hash)) return false

        markHash.add(hash)
        return true
    })
}

export async function saveNews(data: News[], info: string = '') {
    if (data.length === 0)
        return console.log(`${info} no new addtions`)

    try {
        await model.news.saveNews(data)
        console.log(`add ${data.length} ${info} news`)
    } catch(e) {
        console.log(`${info} news save error!`)
    }
}

export async function en2zh(text: string) {
    const salt = (new Date).getTime()
    const curtime = Math.round(new Date().getTime() / 1000)
    const str = conf.youdao.id + truncate(text) + salt + curtime + conf.youdao.key

    const pararms = {
        q: text,
        from: 'en',
        to: 'zh-CHS',
        appKey: conf.youdao.id,
        salt,
        curtime,
        sign: createHash('sha256').update(str).digest('hex'),
        signType: 'v3',
    } as { [key: string]: number | string }

    const body = Object.keys(pararms)
        .map(k => `${k}=${pararms[k]}`)
        .join('&')

    const res = await fetch('https://openapi.youdao.com/api', {
        headers: {
            'accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body,
        method: 'POST',
    })

    const { errorCode, translation } = await res.json()

    if ((+errorCode) !== 0) {
        console.log(`----------------\ntranslation failure!\nerrorCode: ${errorCode}\ntranslation: ${translation}\n----------------`)
        return null
    }

    return translation
}

function truncate(q: string) {
    const len = q.length
    return len <= 20 ? q : (q.substring(0, 10) + len + q.substring(len-10, len))
}

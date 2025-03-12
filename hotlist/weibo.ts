import { HotItem } from './interface'
import { getHash, now } from '../utils'
import { send, action } from '../local-socket'
import * as model from '../model'
import { TYPE } from '../model/keyword'

const id = 8
const risingID = 14
let raw: any[] = []
let hashes: string[] = []

export default async function() {
    return await Promise.all([HotList(), RisingList()])
        .then(results => results.flat())
}

async function HotList() {
    let data: HotItem[]

    try {
        const res = await fetch('https://weibo.com/ajax/side/hotSearch', {
            headers: {
                accept: 'application/json, text/plain, */*',
                'accept-language': 'zh-CN,zh;q=0.9',
                'client-version': 'v2.43.22',
                'sec-ch-ua': '\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '\"Windows\"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'server-version': 'v2023.08.31.1',
                'x-requested-with': 'XMLHttpRequest',
                'x-xsrf-token': '5tJ0vBzoPqCax1PhEHV6Y-xe'
            },
            referrer: 'https://weibo.com/newlogin?tabtype=search&gid=&openLoginLayer=0&url=https%3A%2F%2Fweibo.com%2F',
            referrerPolicy: 'strict-origin-when-cross-origin',
            body: null,
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })

        raw = (await res.json()).data.realtime as any[]
        data = raw.filter((item, i) => (i !== 0 && raw[i - 1].rank === item.rank) ? false : true).map(item => ({
            hash: getHash(id, item.word),
            content: item.word,
            platform: id,
            date: now(id),
            link: `https://s.weibo.com/weibo?q=${encodeURIComponent(item.word_scheme)}`
        } as HotItem))

        hashes = data.map(item => item.hash)
    } catch(e) {
        data = [{
            hash: getHash(id, `${now(id)} 微博热搜这次没抓到`),
            content: `${now(id)} 微博热搜这次没抓到`,
            platform: id,
            date: now(id),
            link: 'https://weibo.com/ajax/side/hotSearch',
        } as HotItem]
    }

    return data
}

async function RisingList() {
    let data: HotItem[]

    try {
        const res = await fetch('https://www.entobit.cn/trending/top/getWeiboRank.do', {
            headers: {
                accept: 'application/json, text/plain, */*',
                'accept-language': 'zh-CN,zh;q=0.9',
                'content-type': 'application/x-www-form-urlencoded',
                priority: 'u=1, i',
                'sec-ch-ua': '\"Google Chrome\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '\"Windows\"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                type: 'restful',
                Referer: 'https://www.entobit.cn/hot-search/desktop',
                'Referrer-Policy': 'strict-origin-when-cross-origin'
            },
            body: 'type=realTimeHotSpots&accessToken=',
            method: 'POST'
        })

        const keywords = (await model.keyword.getKeyword.ByType(TYPE.RISING)).map(record => record.word)

        data = (await res.json() as any[])
            .filter(item => keywords.reduce((r, keyword) => r || item.keywords.includes(keyword), false))
            .map(item => ({
                hash: getHash(risingID, item.keywords),
                content: item.keywords,
                platform: risingID,
                date: now(risingID),
                link: item.url
            }))
    } catch(e) {
        data = [{
            hash: getHash(risingID, `${now(risingID)} 微博上升榜这次没抓到`),
            content: `${now(risingID)} 微博上升榜这次没抓到`,
            platform: risingID,
            date: now(risingID),
            link: 'https://weibo.com/ajax/side/hotSearch',
        } as HotItem]
    }

    return data
}

export async function UpdateWeiboList() {
    const msg = JSON.stringify({
        action: action.SetWeiboHotlist,
        data: { raw, hashes }
    })

    send(msg)
}
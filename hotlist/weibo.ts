import { HotItem } from './interface'
import { getHash, now } from '../utils'
import { send, action } from '../local-socket'

const id = 8
let raw: any[] = []
let hashes: string[] = []

export default async function() {
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

        hashes = data.map(item => item.hash).slice(0, 13)
    } catch(e) {
        data = [{
            hash: getHash(id, `${now(id)} 微博这次没抓到`),
            content: `${now(id)} 微博这次没抓到`,
            platform: id,
            date: now(id),
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
import { HotItem } from './interface'
import { getHash, now } from '../utils'

const id = 13

export default async function() {
    let data: HotItem[]

    try {
        const res = await fetch("https://gw.m.163.com/search/api/v2/hot-search", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,my;q=0.7",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "Referer": "https://wp.m.163.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
        })

        const info = await res.json()

        if(info.code !== 0)
            throw new Error('request failure.')

        data = info.data.hotRank.map((item: any) => ({
            hash: getHash(id, item.hotWord),
            content: item.hotWord,
            platform: id,
            date: now(id),
            link: 'https://wp.m.163.com/163/html/newsapp/hot-content/index.html'
        } as HotItem))
    } catch(e) {
        data = [{
            hash: getHash(id, `${now(id)} 网易这次没抓到`),
            content: `${now(id)} 网易这次没抓到`,
            platform: id,
            date: now(id),
            link: 'https://wp.m.163.com/163/html/newsapp/hot-content/index.html',
        } as HotItem]
    }

    return data
}

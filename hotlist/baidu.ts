import { HotItem } from './interface'
import { getHash, now } from '../utils'

const id = 10

export default async function() {
    let data: HotItem[]

    try {
        const res = await fetch('https://top.baidu.com/board?tab=realtime', {
            headers: {
                accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'zh-CN,zh;q=0.9',
                'cache-control': 'max-age=0',
                'sec-ch-ua': '\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '\"Windows\"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1'
            },
            referrer: 'https://top.baidu.com/board?platform=pc&sa=pcindex_entry',
            referrerPolicy: 'unsafe-url',
            body: null,
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })

        const html = await res.text()
        const [_, raw] = /\<!--s-data:(.*?)--\>/.exec(html) || []
        const info = JSON.parse(raw || '{}')

        data = info.data.cards[0].content.map((item: any) => ({
            hash: getHash(id, item.word),
            content: item.word,
            platform: id,
            date: now(id),
            link: item.url
        } as HotItem))
    } catch(e) {
        data = [{
            hash: getHash(id, `${now(id)} 百度这次没抓到`),
            content: `${now(id)} 百度这次没抓到`,
            platform: id,
            date: now(id),
            link: 'https://top.baidu.com/board?tab=realtime',
        } as HotItem]
    }

    return data
}

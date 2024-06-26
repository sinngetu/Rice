import { HotItem } from './interface'
import { getHash, now } from '../utils'

const id = 9

export default async function () {
    let data: HotItem[]

    try {
        const res = await fetch('https://www.zhihu.com/billboard', {
            headers: {
                accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'zh-CN,zh;q=0.9',
                'cache-control': 'max-age=0',
                'sec-ch-ua': '\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '\"Windows\"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'cross-site',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1'
            },
            referrer: 'https://www.baidu.com/link?url=bz671cAwFX0H-rKB-70lJQxBMxx4YDhAvEI8sCAk9VjLWB-FPqwZ3oQ1tEzjeeSb&wd=&eqid=922b425a0000c0010000000664f6841d',
            referrerPolicy: 'unsafe-url',
            body: null,
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })

        const html = await res.text()
        const [_, rawdata] = /<script id="js-initialData" type="text\/json">(.*?)<\/script>/.exec(html) || []


        const info = JSON.parse(rawdata)
        data = info.initialState.topstory.hotList.map((item: any) => {
            const content = item.target.titleArea.text
            const link = item.target.link.url
    
            return ({
                hash: getHash(id, content),
                content,
                platform: id,
                date: now(id),
                link,
            } as HotItem)
        })
    } catch(e) {
        data = [{
            hash: getHash(id, `${now(id)} 知乎热榜没抓了！赶紧去人机验证！！`),
            content: `${now(id)} 知乎热榜没抓了！赶紧去人机验证！！`,
            platform: id,
            date: now(id),
            link: 'https://www.zhihu.com/billboard',
        } as HotItem]
    }

    return data
}

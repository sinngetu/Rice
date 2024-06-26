import { HotItem } from './interface'
import { getHash, now } from '../utils'

const id = 11

export default async function() {
    let data: HotItem[]

    try {
        const res = await fetch('https://www.toutiao.com/hot-event/hot-board/?origin=toutiao_pc&_signature=_02B4Z6wo00f01oyTuOAAAIDCDJFCoZznrnaMt7xAAMYysnKW3.e0t.MKduR8eq4on5Sixliap7QjgFoKmWSwOd12c4exTFDhbk.4rirsZURoEZ-Cr6SxvZg7aS5-RStv8Enim0UNn3pVw.mleb', {
            headers: {
                accept: 'application/json, text/plain, */*',
                'accept-language': 'zh-CN,zh;q=0.9',
                'sec-ch-ua': '\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '\"Windows\"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin'
            },
            referrer: 'https://www.toutiao.com/',
            referrerPolicy: 'strict-origin-when-cross-origin',
            body: null,
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        })
    
        const info = (await res.json())
        data = [info.fixed_top_data, info.data].flat().map((item: any) => ({
            hash: getHash(id, item.Title),
            content: item.Title,
            platform: id,
            date: now(id),
            link: item.Url
        } as HotItem))
    } catch(e) {
        data = [{
            hash: getHash(id, `${now(id)} 头条这次没抓到`),
            content: `${now(id)} 头条这次没抓到`,
            platform: id,
            date: now(id),
            link: 'https://www.toutiao.com/hot-event/hot-board/?origin=toutiao_pc&_signature=_02B4Z6wo00f01oyTuOAAAIDCDJFCoZznrnaMt7xAAMYysnKW3.e0t.MKduR8eq4on5Sixliap7QjgFoKmWSwOd12c4exTFDhbk.4rirsZURoEZ-Cr6SxvZg7aS5-RStv8Enim0UNn3pVw.mleb',
        } as HotItem]
    }

    return data
}

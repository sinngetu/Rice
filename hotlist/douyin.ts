import { HotItem } from './interface'
import { getHash, now } from '../utils'

const id = [1, 2] // hot, social

export default async function() {
    let data: HotItem[]

    try {
        const res = await Promise.all([
            // 热榜
            fetch('https://www.douyin.com/aweme/v1/web/hot/search/list/?device_platform=webapp&aid=6383&channel=channel_pc_web&detail_list=1&source=6&board_type=0&board_sub_type=&pc_client_type=1&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=2560&screen_height=1440&browser_language=zh-CN&browser_platform=Win32&browser_name=Chrome&browser_version=116.0.0.0&browser_online=true&engine_name=Blink&engine_version=116.0.0.0&os_name=Windows&os_version=10&cpu_core_num=20&device_memory=8&platform=PC&downlink=1.05&effective_type=4g&round_trip_time=200&webid=7259603313640932903&msToken=w0oJlu-AzGkpX0L3_5c9W4fFiAQadJad4OD-Iysd3QEh_-Pok0gdNDFIYRsvY6pi0tr2uxCNqTbmn2HR-WTfjA9tBNzXXW1c05418EC-nrC6s849Jlo=&X-Bogus=DFSzswVL5bTAN9DktydS1e9WX7jU', {
                headers: {
                    accept: 'application/json, text/plain, */*',
                    'accept-language': 'zh-CN,zh;q=0.9',
                    'sec-ch-ua': '\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '\"Windows\"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin'
                },
                referrer: 'https://www.douyin.com/discover',
                referrerPolicy: 'strict-origin-when-cross-origin',
                body: null,
                method: 'GET',
                mode: 'cors',
                credentials: 'include'
            }),

            // 社会榜
            fetch('https://www.douyin.com/aweme/v1/web/hot/search/list/?device_platform=webapp&aid=6383&channel=channel_pc_web&detail_list=1&source=6&board_type=2&board_sub_type=4&pc_client_type=1&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=2560&screen_height=1440&browser_language=zh-CN&browser_platform=Win32&browser_name=Chrome&browser_version=116.0.0.0&browser_online=true&engine_name=Blink&engine_version=116.0.0.0&os_name=Windows&os_version=10&cpu_core_num=20&device_memory=8&platform=PC&downlink=1.05&effective_type=4g&round_trip_time=200&webid=7259603313640932903&msToken=w0oJlu-AzGkpX0L3_5c9W4fFiAQadJad4OD-Iysd3QEh_-Pok0gdNDFIYRsvY6pi0tr2uxCNqTbmn2HR-WTfjA9tBNzXXW1c05418EC-nrC6s849Jlo=&X-Bogus=DFSzswVLu1sAN9DktydSEl9WX7jj', {
                headers: {
                    accept: 'application/json, text/plain, */*',
                    'accept-language': 'zh-CN,zh;q=0.9',
                    'sec-ch-ua': '\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '\"Windows\"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin'
                },
                referrer: 'https://www.douyin.com/discover',
                referrerPolicy: 'strict-origin-when-cross-origin',
                body: null,
                method: 'GET',
                mode: 'cors',
                credentials: 'include'
            })
        ])

        data = (await Promise.all(res.map(r => r.json())))
            .map((raw, i) => raw.data.word_list.map((item: any) => ({
                hash: getHash(id[i], item.word),
                content: item.word,
                platform: id[i],
                date: now(id[i]),
                link: `https://www.douyin.com/hot/${item.sentence_id}/${encodeURIComponent(item.word)}`
            }))).flat()
    } catch(e) {
        data = [{
            hash: getHash(id[1], `${now(id[1])} 抖音这次没抓到`),
            content: `${now(id[1])} 抖音这次没抓到`,
            platform: id[1],
            date: now(id[1]),
            link: 'https://www.douyin.com/aweme/v1/web/hot/search/list/?device_platform=webapp&aid=6383&channel=channel_pc_web&detail_list=1&source=6&board_type=0&board_sub_type=&pc_client_type=1&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=2560&screen_height=1440&browser_language=zh-CN&browser_platform=Win32&browser_name=Chrome&browser_version=116.0.0.0&browser_online=true&engine_name=Blink&engine_version=116.0.0.0&os_name=Windows&os_version=10&cpu_core_num=20&device_memory=8&platform=PC&downlink=1.05&effective_type=4g&round_trip_time=200&webid=7259603313640932903&msToken=w0oJlu-AzGkpX0L3_5c9W4fFiAQadJad4OD-Iysd3QEh_-Pok0gdNDFIYRsvY6pi0tr2uxCNqTbmn2HR-WTfjA9tBNzXXW1c05418EC-nrC6s849Jlo=&X-Bogus=DFSzswVL5bTAN9DktydS1e9WX7jU',
        } as HotItem]
    }

    return data
}

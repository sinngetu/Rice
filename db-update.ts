import * as db from './model/'

const list = [
    { name: '财经网', domain: 'www.caijing.com.cn' },
    { name: '虎嗅', domain: 'www.huxiu.com' },
    { name: '新浪科技', domain: 'tech.sina.com.cn' },
    { name: 'Techweb', domain: 'www.techweb.com.cn' },
    { name: 'zaker', domain: 'www.myzaker.com' },
    { name: '观察者网', domain: 'www.guancha.cn' },
    { name: '红歌会网', domain: 'm.szhgh.com' },
    { name: '环球网', domain: 'www.huanqiu.com' },
    { name: '投资界', domain: 'www.pedaily.cn' },
    { name: '证券时报', domain: 'www.stcn.com' },
    { name: '中国证券网', domain: 'www.cnstock.com' },
    { name: '证券之星', domain: 'www.stockstar.com' },
    { name: '浙江在线', domain: 'm.zjol.com.cn' },
    { name: '杭州网', domain: 'www.hangzhou.com.cn' },
    { name: '浙江省人民政府网', domain: 'www.zj.gov.cn' },
    { name: '中国政府网', domain: 'www.gov.cn' },
    { name: '北京商报', domain: 'bbtnews.com.cn' },
    { name: '钛媒体', domain: 'www.tmtpost.com' },
    { name: '鞭牛士', domain: 'www.bianews.com' },
    { name: '第一财经', domain: 'www.yicai.com' },
]

;(async () => {
    for (const { name, domain } of list)
        await db.media.addMedia(name, domain)

    console.log('done!')
})()
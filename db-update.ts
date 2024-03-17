import * as db from './model/'

const list = [
    {name: '央视网', domain: 'news.cctv.com'},
    {name: '新京报网', domain: 'bjnews.com.cn'},
    {name: 'IT之家', domain: 'www.ithome.com'},
    {name: '亿邦动力', domain: 'www.ebrun.com'},
    {name: '财新网', domain: 'caixin.com'},
    {name: '腾讯网', domain: 'www.qq.com'},
    {name: '界面新闻', domain: 'www.jiemian.com'},
    {name: '财联社', domain: 'www.cls.cn'},
    {name: '36氪', domain: '36kr.com'},
    {name: '凤凰网', domain: 'tech.ifeng.com'},
    {name: '搜狐网', domain: 'www.sohu.com'},
    {name: '网易', domain: 'www.163.com'},
    {name: '白鲸出海', domain: 'www.baijing.cn'},
    {name: '华尔街见闻', domain: 'wallstreetcn.com'},
    {name: '电商报', domain: 'www.dsb.cn'},
    {name: '新浪', domain: 'www.sina.com.cn'},
    {name: '金融界', domain: 'www.jrj.com.cn'},
    {name: '快科技', domain: 'www.mydrivers.com'},
    {name: 'DoNews', domain: 'www.donews.com'},
    {name: '中国新闻网', domain: 'www.chinanews.com'},
    {name: '联合早报', domain: 'www.zaobao.com'},
    {name: '联合早报', domain: 'www.zaobao.com.sg'},
]

;(async () => {
    for (const { name, domain } of list)
        await db.media.addMedia(name, domain)

    console.log('done!')
})()
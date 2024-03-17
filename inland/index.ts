import puppeteer, { Browser } from 'puppeteer'
import config from '../config'

import landian from './www.landiannews.com'
import people from './www.people.com.cn'
import ennews from './www.ennews.com'
import eeo from './www.eeo.com.cn'
import zol from './news.zol.com.cn'
import forbes from './www.forbeschina.com'
import news from './www.news.cn'
import thepaper from './www.thepaper.cn'
import cctv from './news.cctv.com'
import bjnews from './bjnews.com.cn'
import ithome from './www.ithome.com'
import ebrun from './www.ebrun.com'
import caixin from './www.caixin.com'
import qq from './www.qq.com'
import jiemian from './www.jiemian.com'
import cls from './www.cls.cn'
import _36kr from './36kr.com'
import ifeng from './tech.ifeng.com'
import sohu from './www.sohu.com'
import _163 from './www.163.com'
import baijing from './www.baijing.cn'
import wallstreetcn from './wallstreetcn.com'
import dsb from './www.dsb.cn'
import sina from './www.sina.com.cn'
import jrj from './www.jrj.com.cn'
import mydrivers from './www.mydrivers.com'
import donews from './www.donews.com'
import chinanews from './www.chinanews.com'
import zaobao from './www.zaobao.com'

const website = async (browser: Browser) => {
    const data = [
        await landian(browser),
        await people(browser),
        await ennews(browser),
        await eeo(browser),
        await zol(browser),
        await forbes(browser),
        await news(browser),
        await thepaper(browser),
        await cctv(browser),
        await bjnews(browser),
        await ithome(browser),
        await ebrun(browser),
        await caixin(browser),
        await qq(browser),
        await jiemian(browser),
        await cls(browser),
        await _36kr(browser),
        await ifeng(browser),
        await sohu(browser),
        await _163(browser),
        await baijing(browser),
        await wallstreetcn(browser),
        await dsb(browser),
        await sina(browser),
        await jrj(browser),
        await mydrivers(browser),
        await donews(browser),
        await chinanews(browser),
        await zaobao(browser),
    ]

    return data.flat()
}

export default async () => {
    const browser = await puppeteer.launch({ headless: !config.DEV, defaultViewport: null })
    const data = await website(browser)

    await browser.close()
    return data
}

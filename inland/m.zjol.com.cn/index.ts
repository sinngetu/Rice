import template from '../template'

export default template('https://m.zjol.com.cn/', () => {
    const links = [
        'ul.slides>li>a',
        '.subnews>a',
        '.hot>a',
        'ul.newslist>li>a',
        'ul.slides>li>a',
        'ul.ywimgs>li>a',
        '.oneImgNew>a',
        'ul.cwnews>li>a',
        '.onenew>a',
        'ul.cpnews>li>a',
        '.topnew>a',
        '.lmtitle>a',
        'ul.imgnewslist>li>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
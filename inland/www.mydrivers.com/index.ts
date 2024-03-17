import template from '../template'

export default template('https://www.mydrivers.com/', () => {
    const links = [
        'span.ct_txt>a',
        '.shidian_s_tu>ul>li>p>a',
        '.shidian_s_tjian>ul>li>span>a',
        'ul.newslist>li>span>a',
        '.owl-item>ul>li>.text>a',
        'h5 a',
        'h4 a',
        'ul.classify1>li>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
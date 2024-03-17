import template from '../template'

export default template('https://www.zaobao.com/news', () => {
    const isSG =  window.location.hostname === 'www.zaobao.com.sg'
    const links = (isSG ? [
        '.article-type-content>a',
        'a.link-article',
    ] : [
        '.list>a',
        '.rank-item a',
    ]).map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
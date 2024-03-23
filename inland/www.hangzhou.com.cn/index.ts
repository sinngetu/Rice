import template from '../template'

export default template('https://www.hangzhou.com.cn', () => {
    const links = [
        'h2>a',
        '.min_tit>span>a',
        'li>a',
        'h1>a',
        'p>a',
        'dt>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
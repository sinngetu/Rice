import template from '../template'

export default template('https://www.news.cn/', () => {
    const links = [
        'h1>a',
        '.tit>a',
        'li>a',
        'span>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})

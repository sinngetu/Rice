import template from '../template'

export default template('https://www.stockstar.com/', () => {
    const links = [
        'ul>li>a',
        'h3>a',
        '#gdxw>.cnt>span>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})

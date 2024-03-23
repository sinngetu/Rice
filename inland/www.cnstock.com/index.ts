import template from '../template'

export default template('https://www.cnstock.com/', () => {
    const links = [
        'h1>a',
        'h2>a',
        'h3>a',
        'p.img-title>a',
        '.szkx>.bd>ul>li>a',
        '.ggsd-list-tab>bd ul>li>a',
        'ul.jd-list>li>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
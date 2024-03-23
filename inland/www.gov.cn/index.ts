import template from '../template'

export default template('https://www.gov.cn/', () => {
    const links = [
        'h2>a',
        '.memo>a',
        'h4>a',
        '#index_ywowen>ul>li>div>a',
        'ul>li>a',
        '.item>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
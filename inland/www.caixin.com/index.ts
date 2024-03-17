import template from '../template'

export default template('https://www.caixin.com/', () => {
    const links = [
        'dl>dt>a',
        'dl>.wzdf>a',
        'ul>li>p>a',
        'dl>dd>p>a',
        '.tit>p>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
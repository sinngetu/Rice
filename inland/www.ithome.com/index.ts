import template from '../template'

export default template('https://www.ithome.com/', () => {
    const links = [
        '#tt>a',
        '.nl>li>a',
        '.bd.order>li>a',
        '.pb>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
}, undefined)
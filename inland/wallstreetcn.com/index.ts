import template from '../template'

export default template('https://wallstreetcn.com/', () => {
    const links = [
        '.carousel-item a',
        '.home-live-item>a',
        '.container>a',
        '.live-item>a',
        '.list.main>.item>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
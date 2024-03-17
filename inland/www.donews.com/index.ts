import template from '../template'

export default template('https://www.donews.com/', () => {
    const links = [
        '.carousel-inner>.item>a',
        '.sub-banner-wrapper>.item>a',
        '.normal-item>.content>.title>a',
        '#news-flash-list>.list-item>a',
        '.recommend-item>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
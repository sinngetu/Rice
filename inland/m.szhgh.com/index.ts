import template from '../template'

export default template('https://m.szhgh.com/', () => {
    const links = [
        '.swiper-slide>a',
        '.img-text>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
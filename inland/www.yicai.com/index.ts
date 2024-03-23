import template from '../template'

export default template('https://www.yicai.com/', () => {
    const links = [
        '.swiper-slide>a',
        '.f-toe>a',
        '#scrollFontDiv1>ul>li>a',
        '#headlist>a',
        'a.swiper-slide',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})

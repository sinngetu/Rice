import template from '../template'

export default template('https://www.eeo.com.cn/', () => {
    const links = [
        '.swiper-slide a',
        'li a',
        '.level a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
import template from '../template'

export default template('https://www.ebrun.com/', () => {
    const links = [
        '.info>p.title>a',
        '.swiper-slide>.item>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
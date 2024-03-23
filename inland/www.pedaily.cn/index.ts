import template from '../template'

export default template('https://www.pedaily.cn/', () => {
    const links = [
        '.swiper-slide>a',
        '.list>a',
        '.editdot>a',
        'h3>a',
        'ul.list>li>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    const list = Array.from(document.querySelectorAll('#ulFirst h4.title')) as HTMLSpanElement[]

    return [
        links.map(a => ({
            link: a.href,
            title: a.innerText
        })),

        list.map(span => ({
            link: 'https://www.pedaily.cn/',
            title: span.innerText,
            allowLinkRepeta: true
        }))
    ].flat()
}, 'domcontentloaded')
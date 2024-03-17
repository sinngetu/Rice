import template from '../template'

export default template('https://www.dsb.cn/', () => {
    const links = [
        'li.glide__slide>.home-top-article>a',
        'h2>a',
        'h3>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    const list = Array.from(document.querySelectorAll('h3>span')) as HTMLSpanElement[]

    return [
        links.map(a => ({
            link: a.href,
            title: a.innerText
        })),

        list.map(span => ({
            link: 'https://www.dsb.cn/news',
            title: span.innerText,
            allowLinkRepeta: true
        }))
    ].flat()
})
import template from '../template'

export default template('https://www.myzaker.com/', () => {
    const links = [
        'ul.list>li>a',
        '.article-content>a',
        'h3>a',
        '.covers>a.cover',
        'ul.swiper-wrapper>li>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    const list = Array.from(document.querySelectorAll('.carousel-inner>a>.carousel-right h2')) as HTMLSpanElement[]

    return [
        links.map(a => ({
            link: a.href,
            title: a.innerText
        })),

        list.map(span => ({
            link: 'https://www.myzaker.com/',
            title: span.innerText,
            allowLinkRepeta: true
        }))
    ].flat()
})
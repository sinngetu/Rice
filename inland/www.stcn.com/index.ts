import template from '../template'

export default template('https://www.stcn.com/', () => {
    const links = [
        'h1>a',
        '.swiper-wrapper>a',
        'ul.index-quick-news-list>li>a',
        '.top>a',
        'ul.under-line>li>a',
        'a.tt',
        '.live-video-list-title>a',
        '.l>a',
        '.card-title>a',
        'ul.card-list>li>a',
        '#index-hot-list>li>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})

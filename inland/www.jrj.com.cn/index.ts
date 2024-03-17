import template from '../template'

export default template('https://www.jrj.com.cn/', () => {
    const links = [
        '.swiper-wrapper>a',
        '.advertising-photo>a',
        '#newsList>li>a',
        '#container ul>li>a',
        'ul.news-flash-con>li>a',
        'ul.news-list>li>a',
        'ul.topic-list>li>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
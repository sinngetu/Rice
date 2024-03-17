import template from '../template'

export default template('https://36kr.com/', () => {
    const links = [
        '.carousel-item-wrapper a.banner-left-item-info',
        'ul.banner-right-list>li>a',
        'a.article-item-title',
        'ul.specialtopic-recommend-list>li>a',
        '.hotlist-item-toptwo>a.hotlist-item-toptwo-title',
        '.hotlist-item-other>.hotlist-item-other-info>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    const list = Array.from(document.querySelectorAll('.column-newsflash-item>.column-newsflash-item-head>.column-newsflash-item-title')) as HTMLDivElement[]

    return [
        links.map(a => ({
            link: a.href,
            title: a.innerText
        })),

        list.map(div => ({
            link: 'https://36kr.com/newsflashes',
            title: div.innerText,
            allowLinkRepeta: true
        }))
    ].flat()
})
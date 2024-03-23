import template from '../template'

export default template('http://bbtnews.com.cn/', () => {
    const links = [
        'ul.real_scroll>li>a',
        'ul.carousel-inner>li>a',
        '.video_top>a',
        '.video_small>a',
        '.detail_cont>a',
        '.observe_listDetail>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
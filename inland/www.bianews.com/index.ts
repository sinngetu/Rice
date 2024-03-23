import template from '../template'

export default template('http://www.bianews.com/', () => {
    const links = Array.from(document.querySelectorAll('.swiper-wrapper>a')) as HTMLLinkElement[]

    const list = [
        '.js_news_item>.infos_wrap>a.title',
        '.item>.title',
        'li>a.js_title>.title',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLDivElement[]).flat()

    return [
        links.map(a => ({
            link: a.href !== 'javascript:;' ? a.href : (a.attributes as any)['data-url'].value,
            title: a.innerText
        })),

        list.map(div => ({
            link: 'http://www.bianews.com/',
            title: div.innerText,
            allowLinkRepeta: true
        }))
    ].flat()
}, 'networkidle0')
import template from '../template'

export default template('https://www.huxiu.com/', () => {
    const links = [
        '.tibt-card__bottom>a',
        'home-deep-reading__right>a',
        'brief_header>a',
        '.lirt-item__right>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    const list = [
        '.ImageSlider>div>h5',
        '.home-recommend-module__right>a>h4',
        '.home-moment-list>ul>li home-moment-list__bottom-wrap>span',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLDivElement[]).flat()

    return [
        links.map(a => ({
            link: a.href,
            title: a.innerText
        })),

        list.map(div => ({
            link: 'https://www.huxiu.com/',
            title: div.innerText,
            allowLinkRepeta: true
        }))
    ].flat()
})
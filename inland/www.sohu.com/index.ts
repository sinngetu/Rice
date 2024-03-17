import template from '../template'

export default template('https://www.sohu.com/', () => {
    const links = [
        '#swiper>.con>.pic>a',
        '.pic-group>ul>li>a',
        '.content-all a',
        'ul.news>li>a',
        '.list16 a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
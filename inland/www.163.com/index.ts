import template from '../template'

export default template('https://www.163.com/', () => {
    const links = [
        'h3>a',
        'p[ne-role="slide-page"]>a',
        '.gkklist a',
        'ul.cm_ul_round a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
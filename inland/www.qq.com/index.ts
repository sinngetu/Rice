import template from '../template'

export default template('https://www.qq.com/', () => {
    const links = [
        '.command-item>a',
        'a.title',
        'a.title-info',
        'a.content',
        '.rank-info>a',
        'a.video-jump',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
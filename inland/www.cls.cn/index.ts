import template from '../template'

export default template('https://www.cls.cn/', () => {
    const links = [
        'a.f-w-b.b-c-222',
        'a.home-article-title',
        'a.home-article-rec-list',
        '.home-telegraph-item>a',
        '.home-article-ranking-list>.home-article-ranking-title>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
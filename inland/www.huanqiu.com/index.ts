import template from '../template'

export default template('https://www.huanqiu.com/', () => {
    const links = [
        'h1>a',
        '.topHeadlines>p a',
        'h2>a',
        'ul.imgCon>li>.imgTitle>a',
        'dt>a',
        'dd>a',
        'h4>a',
        'p>a',
        'ul.videoNews>li>a',
        'ul.speColumnList>li>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
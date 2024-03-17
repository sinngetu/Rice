import template from '../template'

export default template('https://www.jiemian.com/', () => {
    const links = [
        '.reports_item>a',
        '.task-items>.task-content a',
        '.news-view>.news-img>a',
        '.news-view>.news-header>a',
        '.timeline-news>ul>li>.news-item>.content-node>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
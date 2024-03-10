import template from '../template'

export default template('https://www.landiannews.com/', () => {
    const selector = '.article-list.post-list-layout.post ul li article .list-content a.title'
    const links = Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})

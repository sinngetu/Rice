import template from '../template'

export default template('https://news.zol.com.cn/', () => {
    const selector = 'li.news-moudle_item p a'
    const links = Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})

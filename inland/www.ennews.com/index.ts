import template from '../template'

export default template('https://www.ennews.com/news/', () => {
    const selector = '.z_short_box .z_short_con1 a'
    const links = Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})

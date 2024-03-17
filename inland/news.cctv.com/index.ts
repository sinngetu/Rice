import template from '../template'

export default template('https://news.cctv.com/', () => {
    const selector = 'h3 a'
    const links = Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})

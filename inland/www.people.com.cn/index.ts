import template from '../template'

export default template('http://www.people.com.cn/', () => {
    const links = [
        'h2 a',
        'h3 a',
        'li a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})

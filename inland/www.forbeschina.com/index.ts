import template from '../template'

export default template('https://www.forbeschina.com/', () => {
    const links = [
        'h4 a',
        'li a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})

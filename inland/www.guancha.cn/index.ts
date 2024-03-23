import template from '../template'

export default template('https://www.guancha.cn/', () => {
    const links = [
        'h3>a',
        'ul.content-headline-other>li>a',
        'h4>a',
        '.module-fengwen-hot-box>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
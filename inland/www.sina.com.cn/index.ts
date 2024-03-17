import template from '../template'

export default template('https://www.sina.com.cn/', () => {
    const links = [
        '.slide01_items>p>a',
        'ul.list-a>li>a',
        'ul.list-b>li>a',
        'abstract.uni-blk-pic',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
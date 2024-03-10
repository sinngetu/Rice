import template from '../template'

export default template('https://www.thepaper.cn/', () => {
    const links = [
        '.index_contanier__xW_Be span a',
        'li>a',
        'h3>a',
        '.ant-card .small_toplink__GmZhY a',
        '.titleimg>a',
        '.mdCard>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})

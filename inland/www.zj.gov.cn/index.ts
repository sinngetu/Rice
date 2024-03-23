import template from '../template'

export default template('https://www.zj.gov.cn/', () => {
    const links = [
        '.headLinesWrap>li>a',
        'ul.pic>li>a',
        '.default_pgContainer>li>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})

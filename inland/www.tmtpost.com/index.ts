import template from '../template'

export default template('https://www.tmtpost.com/', () => {
    const links = [
        '.el-carousel__item>a',
        '.top_recommend_module a',
        '.r_top>a._tit',
        '#list_roll_box>a',
        'a.itemWithImage',
        'a.item',
        'p.wrap>a',
        'a._tit',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})

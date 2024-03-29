import template from '../template'

export default template('https://www.techweb.com.cn/', () => {
    const links = [
        'h1>a',
        '.news>ul>li>a',
        '.products>.product_item>a',
        '.guandian_list>.select_con>h2>a',
        'h3>a',
        '.exclusive_con>ul>li>a',
        '.compile_con>ul>li>a',
        '.house_con>.picture_text>a',
        '.special_con>ul>li>a',
        '.cloud_con>ul>li>a',
        '.game_con>.picture_text>a',
        '.ranking_con>ul>li>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
}, 'domcontentloaded')

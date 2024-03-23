import template from '../template'

export default template('https://www.caijing.com.cn/', () => {
    const links = [
        'h4>a',
        'ul.jrtt_list>li>a',
        '#area_index_comm_top2_2011>ul>li>a',
        '.sprd_pl>p>span>a',
        'ul.yaowen_ul>li>a',
        '.zl_plink>a',
        '.mjbk_a>a',
        '.kj_tit>span>a',
        '.cjshj_a>p>a',
        '.mjbk_dl a',
        'ul.phm_show>li>a',
        '.cjkjbw_top a',
        'ul.kjBoke_ul>li>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
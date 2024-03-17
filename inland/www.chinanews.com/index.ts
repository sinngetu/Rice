import template from '../template'

export default template('https://www.chinanews.com/', () => {
    const links = [
        '.xwzxdd-dbt>a',
        '.xwzxdd-xbt>div>a',
        '.banner_info>ul>li>a',
        '.module_topcon_ul>div>a',
        '._jsxwdiv>ul.jsxw-list>li>a',
        '.txt>a',
        '.tslm-img>a',
        '.tslm-list>ul>li>a',
        '.ywjx-news-list>ul>li>a',
        '.rdph-list>ul>li>a',
        '.spSmallPic-div>a',
        '.lanmu_middle_ul>li>a',
        '.module_top_tuwen>.righttext>a',
        '.lanmu_right_ul>li>a',
        '.lanmu_left>.img_title_wrapper>a',
        '.lanmu_left>.conlist_img>a',
        '.rmsys_left_tuwen>.righttext>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
import template from '../template'

export default template('https://tech.sina.com.cn/roll/rollnews.shtml', () => {
    const selector = '#d_list>ul>li>.c_tit>a'
    const links = Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})

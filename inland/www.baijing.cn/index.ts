import template from '../template'

export default template('https://www.baijing.cn/', () => {
    const links = [
        '.banner_news_list>.news_list_item>.item_text_area a',
        '.article_item_right>a',
        '.el-timeline-item__content>a',
        '.hot_article_item_right a',
        '.report_title a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
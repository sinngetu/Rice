import template from '../template'

export default template('https://tech.ifeng.com/', () => {
    const links = [
        'p.index_cWhite_-Nlvv>a',
        '.index_newsflow_Spsg- a.index_content_C9Mh7',
        'a.index_title_oqpqT',
        'a.index_item_wHf7h',
        'a.index_video_title_AHca4',
        'a.index_item_vbIyP',
        'a.index_title_hsF9L',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[]).flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
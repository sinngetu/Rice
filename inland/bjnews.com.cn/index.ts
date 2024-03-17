import template from '../template'

export default template('http://www.bjnews.com.cn/', () => {
    const links = [
        '.pin_demo>a',
        '.pin_tips>a',
        'h3>a',
    ].map(selector => Array.from(document.querySelectorAll(selector)) as HTMLLinkElement[])
     .concat(Array.from(document.querySelectorAll('.swiper-slide>div>a>.title')).map(e => e.parentElement) as HTMLLinkElement[])
     .flat()

    return links.map(a => ({
        link: a.href,
        title: a.innerText
    }))
})
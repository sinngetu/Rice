import { News } from '../interface'
import * as model from '../model'
import { en2zh } from '../utils'
import { send, action } from '../local-socket/'

let mediums: number[]
let keywords: string[]

const domains = ['www.wsj.com', 'cn.wsj.com', 'nytimes.com']

export default async function (news: News[]) {
    if (!mediums) mediums = (await model.media.getMedia()).filter(medium => domains.includes(medium.domain)).map(medium => medium.id)
    if (!keywords) keywords = (await model.keyword.getKeyword.ByType(model.keyword.TYPE.OVERSEAS)).map(record => record.word.toLowerCase())

    const BigNews = news.filter(({ title, medium }) => {
        title = title.toLowerCase()

        const inMediumList = mediums.includes(medium)
        const hasKeyword = keywords.reduce((result, keyword) => result || title.includes(keyword), false)

        return inMediumList || hasKeyword
    })

    if (BigNews.length) {
        const title = BigNews.map(({ title }) => title)
        const translation = (await en2zh(title.join('\n'))).split('\n')
        const data = BigNews.map(({ link, title }, i) => ({ link, title, translation: translation[i] }));

        data.forEach(item => {
            if (item.translation === item.title)
                delete item.translation
        })

        const message = JSON.stringify({ action: action.BigNews, data })

        send(message)
    }
}

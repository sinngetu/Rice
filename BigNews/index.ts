import { News } from '../interface'
import * as model from '../model/'
import { send } from './server'

let mediums: number[]
let keywords: string[]

const domains = ['www.wsj.com', 'cn.wsj.com', 'nytimes.com']

export default async function (news: News[]) {
    if (!mediums) mediums = (await model.media.getMedia()).filter(medium => domains.includes(medium.domain)).map(medium => medium.id)
    if (!keywords) keywords = (await model.keyword.getKeyword.ByType(model.keyword.TYPE.OVERSEAS)).map(record => record.word)

    const BigNews = news.filter(({ title, medium }) => {
        title = title.toLowerCase()

        const inMediumList = mediums.includes(medium)
        const hasKeyword = keywords.reduce((result, keyword) => result || title.includes(keyword), false)

        return inMediumList || hasKeyword
    })

    if (BigNews.length) send(JSON.stringify(BigNews.map(({ link, title }) => ({ link, title }))))
}

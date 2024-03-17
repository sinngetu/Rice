import { News } from '../interface'
import send from './send'

const overseeMedium = [1, 22, 23, 24, 25, 26, 27, 64]
const overseeKeywords = ['马云', 'jack ma', '阿里', 'alibaba']

export default function (news: News[]) {
    const BigNews = news.filter(({ title, medium }) => {
        title = title.toLowerCase()

        const isOverseeMedia = overseeMedium.includes(medium)
        const hasOverseeKeyword = !isOverseeMedia || overseeKeywords.reduce((result, keyword) => result || title.includes(keyword), false)

        return isOverseeMedia && hasOverseeKeyword
    })

    if (BigNews.length) send(JSON.stringify(BigNews))
}

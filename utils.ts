import { createHash } from 'node:crypto'
import { News } from './interface'
import * as model from './model'

export * as model from './model'
export function md5(content: string) { return createHash('md5').update(content).digest('hex') }
export function getHash(medium: number, url: string, title: string = '') { return md5(`${medium}-${url}${'-'+title}`) }
export async function deduplicate(data: News[]) {
    const existHash = (await model.news.getNews.ByHash(data.reduce((result, item) => result.concat(item.hash), ([] as string[]))) as News[]).map(i => i.hash)
    const markHash = new Set()

    return data.filter(({ hash }) => {
        if (existHash.includes(hash)) return false
        if (markHash.has(hash)) return false

        markHash.add(hash)
        return true
    })
}

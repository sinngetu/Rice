import db from './db'

export interface Record {
    hash: string
    link: string
    medium: number
    title: string
    date: string
    status: number
    tags: string
}

const table = () => db<Record>('work_news')

export async function saveNews(data: Record[]) { return data.length ? await table().insert(data) : [] }

export const getNews = {
    ByHash: async (hash: string[]) => hash.length ? await table().whereIn('hash', hash).select('*') : [],
    ByTitle: async (keyword: string) => keyword ? await table().whereLike('title', keyword).select('*') : []
}

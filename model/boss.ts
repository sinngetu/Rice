import db from './db'

export interface Record {
    hash: string
    content: string
    link: string
    date: string
    type: number
}

const table = () => db<Record>('work_boss')

export async function saveInfo(data: Record[]) { return data.length ? await table().insert(data) : [] }

export const getInfo = {
    ByHash: async (hash: string[]) => hash.length ? await table().whereIn('hash', hash).select('*') : [],
    ByContent: async (keyword: string) => keyword ? await table().whereLike('content', keyword).select('*') : []
}
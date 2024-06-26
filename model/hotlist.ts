import db from './db'

export interface Record {
    hash: string
    content: string
    platform: number
    date: string,
    link: string
}

const table = () => db<Record>('work_hotlist')

export async function saveContent(data: Record[]) { return data.length ? await table().insert(data) : [] }
export const getList = {
    ByHash: async (hash: string[]) => hash.length ? await table().whereIn('hash', hash).select('*') : [],
}

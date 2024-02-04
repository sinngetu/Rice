import db from './db'

export interface Record {
    id: number
    word: string
    type: number
    extend?: string
}

const table = () => db<Record>('work_keyword')

export const getKeyword = {
    All: async () => { return await table().select('*') },
    ById: async (id: number) => { return await table().select('*').where('id', id) },
}

export async function addKeyword(word: string, type: number, extend?: string) {
    return await table().insert({ word, type, extend })
}

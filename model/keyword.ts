import db from './db'

export interface Record {
    id: number
    word: string
    type: number
    extend?: string
}

const table = () => db<Record>('work_keyword')

export const TYPE = {
    HOTLIST: 0,
    OVERSEAS_TAG: 1,
    OVERSEAS: 2,
    GOOGLE: 3,
    WANDA: 4,
    INLAND: 5,
}

export const getKeyword = {
    All: async () => { return await table().select('*') },
    ById: async (id: number) => { return await table().select('*').where('id', id) },
    ByType: async (type: number) => { return await table().select('*').where('type', type) },
}

export async function addKeyword(word: string, type: number, extend?: string) {
    return await table().insert({ word, type, extend })
}

export async function editKeyword(id: number, word: string, extend: string) {
    return table().where('id', id).update({ word, extend })
}
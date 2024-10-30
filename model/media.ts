import db from './db'

export interface Record {
    id: number
    name: string
    domain: string
    type: number
}

const table = () => db<Record>('work_media')
let media: Record[] | null = null

export async function getMedia() {
    if (!media) media = await table().select('*')

    return media
}

export async function addMedia(name: string, domain: string) {
    return await table().insert({ name, domain })
}
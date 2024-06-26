import db from './db'

export interface Record {
    id: number
    name: string
}

const table = () => db<Record>('work_platforms')
let media: Record[] | null = null

export async function getPlatforms() {
    if (!media) media = await table().select('*')

    return media
}

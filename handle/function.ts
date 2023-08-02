import { createHash } from 'node:crypto'
import { New } from './interface'
import db from '../db'

export { default as db } from '../db'
export function md5(content: string) { return createHash('md5').update(content).digest('hex') }
export function getHash(medium: string, title: string) { return md5(`${medium}-${title}`) }
export async function deduplicate(data: New[]) {
    const existHash = ((await db.query(db.condition({
        hash: data.reduce((result, item) => [...result, item.hash], ([] as string[]))
    }))) as New[]).map(i => i.hash)

    const markHash = new Set()

    return data.filter(({ hash }) => {
        if (existHash.includes(hash)) return false
        if (markHash.has(hash)) return false

        markHash.add(hash)
        return true
    })
}

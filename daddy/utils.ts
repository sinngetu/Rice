import { createHash } from 'node:crypto'
import { Record } from './interface'
import * as model from '../model'

export * as model from '../model'
export function md5(content: string) { return createHash('md5').update(content).digest('hex') }
export function getHash(url: string) { return md5(url) }
export async function deduplicate(data: Record[]) {
    const existHash = (await model.daddy.getInfo.ByHash(data.reduce((result, item) => result.concat(item.hash), ([] as string[]))) as Record[]).map(i => i.hash)
    const markHash = new Set()

    return data.filter(({ hash }) => {
        if (existHash.includes(hash)) return false
        if (markHash.has(hash)) return false

        markHash.add(hash)
        return true
    })
}

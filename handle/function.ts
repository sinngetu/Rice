import { createHash } from 'node:crypto'

export { default as db } from '../db'
export function md5(content: string) { return createHash('md5').update(content).digest('hex') }

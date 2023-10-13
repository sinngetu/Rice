import db from './db'

export async function close() { await db.destroy() }
export * as media from './media'
export * as news from './news'
export * as daddy from './daddy'

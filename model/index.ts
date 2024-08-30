import db from './db'

export async function close() { await db.destroy() }
export * as media from './media'
export * as news from './news'
export * as boss from './boss'
export * as keyword from './keyword'
export * as hotlist from './hotlist'
export * as platforms from './platforms'
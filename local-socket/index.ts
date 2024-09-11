import net from 'node:net'
import Debug from 'debug'

export { action } from './action'

const PORT = 9503
const debug = Debug(`local-socket:${PORT}`)
let client: net.Socket

export function send(data: string) {
    try { client = net.connect(PORT, '127.0.0.1', () => debug('server connected!')) }
    catch(e) { debug(e); console.error('failed to connect server!') }
    
    if (!client) return
    client.write(data)
    client.end()

    debug('message has sended!')
}

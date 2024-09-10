import net from 'node:net'
import Debug from 'debug'

const PORT = 9503
const debug = Debug(`local-socket:${PORT}`)
let client: net.Socket

export default function(data: string) {
    try { client = net.connect(PORT, '127.0.0.1', () => debug('server connected!')) }
    catch(e) { debug(e); console.error('failed to connect server!') }

    if (!client) return
    client.write(data)
    client.end()
}
import net from 'node:net'
import Debug from 'debug'

const PIPE_NAME = 'BigNews'
const PIPE_PATH = '\\\\.\\pipe\\' + PIPE_NAME
const debug = Debug(`client-pipe:${PIPE_NAME}`)
let client: net.Socket

export default function(data: string) {
    try { client = net.connect(PIPE_PATH, () => debug('server connected!')) }
    catch(e) { debug('failed to connect server!') }

    if (!client) return
    client.write(data)
    client.end()
}

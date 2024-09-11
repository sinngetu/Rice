import net from 'node:net'
import Debug from 'debug'

const PIPE_NAME = 'BigNews'
const PIPE_PATH = '\\\\.\\pipe\\' + PIPE_NAME
const debug = Debug(`pipe:${PIPE_NAME}`)
const connections = new Set<net.Socket>()

const server = net.createServer(connection => {
    debug('client connected!')

    connections.add(connection)
    connection.on('end', () => {
        debug('client connection end!')
        connections.delete(connection)
    })
})

server.listen(PIPE_PATH)

export function send(data: string) {
    connections.forEach((connection) => {
        connection.write(data + '\n', 'utf-8')
    })
}
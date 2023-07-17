export default {
    DEV: process.argv.includes('--dev'),
    db: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'work',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
    }
}

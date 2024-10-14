export default {
    DEV: process.argv.includes('--dev'),
    db: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'work'
    },
    youdao: {
        id: '',
        key: ''
    },
    PageReloadTimes: 10
}

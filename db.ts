import mysql from 'mysql2'
import config from './config'

const connection = mysql.createConnection(config.db)
// const pool = mysql.createPool(config.db)

function connect() { connection.connect() }
function close() { connection.end() }
async function query() {
    const sql = 'SELECT * FROM `work_news`'

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

function add(data: any) {
    data = Array.isArray(data) ? data : [data]

    const keys = Object.keys(data[0])
    const values = data.map((item: any) => `(${keys.map(key => mysql.escape(item[key])).join(',')})`).join(',')

    const sql = `INSERT INTO work_news(${keys.map(key => `\`${key}\``).join(',')}) VALUES${values}`

    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

export default { connect, close, query, add }

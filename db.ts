import mysql from 'mysql2'
import config from './config'

const connection = mysql.createConnection(config.db)
// const pool = mysql.createPool(config.db)

function connect() { connection.connect() }
function close() { connection.end() }

interface Condition {
    hash?: string | string[]
    title?: string
}

function condition(condition: Condition) {
    if (typeof condition.hash === 'string')
        condition.hash = [condition.hash]

    const hash = condition.hash?.map(hash => `hash=${mysql.escape(hash)}`).join(' OR ') || ''

    return hash ? ` WHERE ${hash}` : ''
}

async function query(condition: string) {
    const sql = 'SELECT * FROM `work_news`' + condition

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

export default { connect, close, condition, query, add }

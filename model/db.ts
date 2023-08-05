import knex from 'knex'

import config from '../config'

export default knex({
    client: 'mysql2',
    connection: config.db
})

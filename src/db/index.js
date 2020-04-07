var { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: '10.10.10.194',
  database: 'polycade',
  password: '123123',
  port: 5432
})

const oldPoolQuery = pool.query
pool.query = (...args) => {
  console.log('QUERY:', args)
  return oldPoolQuery.apply(pool, args)
}

module.exports = pool

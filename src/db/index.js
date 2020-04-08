var { Pool } = require('pg')

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'polycade',
  password: process.env.DB_PASS || '',
  port: process.env.DB_PORT || 5432
})

pool.query('SELECT NOW()').then(res =>
  console.log(`Database connected ${res.rows[0].now}`))

const oldPoolQuery = pool.query
pool.query = (...args) => {
  console.log('QUERY:', args)
  return oldPoolQuery.apply(pool, args)
}

module.exports = pool

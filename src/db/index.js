var { Pool } = require('pg')

const pool = new Pool()

pool.query('SELECT NOW()').then(res =>
  console.log(`Database connected ${res.rows[0].now}`))
  .catch(err => console.log(err.stack))

const oldPoolQuery = pool.query
pool.query = (...args) => {
  console.log('QUERY:', args)
  return oldPoolQuery.apply(pool, args)
}

module.exports = pool

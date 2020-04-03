module.exports = {
  all,
  find,
  create,
  update,
  prices
}

const table = 'pricings'
var db = require('../db')

function all () {
  return db.query(`select * from ${table}`)
}

function find (id) {
  const sql = `select * from ${table} where id = $1 limit 1`
  return db.query(sql, [id])
}

async function create (name) {
  const sql = `insert into ${table}(id, name) values($1, $2)`

  const result = await db.query('select nextval(\'pricings_id_seq\'::regclass)')
  const id = result.rows[0].nextval
  await db.query(sql, [id, name])
  return id
}

function update (id, name) {
  const sql = `update ${table} set name = $2 where id = $1`
  return db.query(sql, [id, name])
}

function prices (id) {
  const sql = `select prices.id, prices.price, prices.name, prices.value from prices
  join pricing_price on prices.id = pricing_price.price_id
  and pricing_price.pricing_id = $1`
  return db.query(sql, [id])
}

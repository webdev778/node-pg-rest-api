module.exports = {
  all,
  find,
  findBy,
  create,
  update,
  destroy
}

const table = 'pricing_price'
var db = require('../db')

function all () {
  return db.query(`select * from ${table}`)
}

function find (id) {
  const sql = `select * from ${table} where id = $1 limit 1`
  return db.query(sql, [id])
}

function findBy (attrs) {
  const { pricingId, priceId } = attrs
  const sql = `select * from ${table} where pricing_id = $1 and price_id = $2 limit 1`
  return db.query(sql, [pricingId, priceId])
}

async function create (attrs) {
  const { pricingId, priceId } = attrs
  const sql = `insert into ${table}(pricing_id, price_id) values($1, $2)`

  const result = await db.query('select nextval(\'prices_id_seq\'::regclass)')
  const id = result.rows[0].nextval
  await db.query(sql, [pricingId, priceId])
  return id
}

function update (id, name) {
  const sql = `update ${table} set name = $2 where id = $1`
  return db.query(sql, [id, name])
}

function destroy (id) {
  const sql = `delete from ${table} where id = $1`
  return db.query(sql, [id])
}

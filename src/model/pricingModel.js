var db = require("../db");

async function all(req, resp) {
  const { rows: pricings } = await db.query("select id, name from pricings");

  const ret = {};
  for (i = 0; i < pricings.length; i++) {
    const p = pricings[i];
    const { rows } = await db.query(
      `select prices.id from prices join pricing_price on prices.id = pricing_price.price_id and pricing_price.pricing_id = ${p.id}`
    );
    ret[p.id] = { ...p, pricing: rows.map(r => r.id) };
  }

  // add default pricing
  const { rows: defaultPrices } = await db.query(
    "select id, price, name, value from prices order by price"
  );
  ret["default_pricing"] = defaultPrices;
  resp.json(ret);
  console.log(ret);
}

async function create(req, resp) {
  const { pricing } = req.body;
  const result = await db.query(`select nextval('pricings_id_seq'::regclass)`);
  const pricing_id = result.rows[0].nextval;
  await db.query("insert into pricings(id, name) values($1, $2)", [
    pricing_id,
    pricing.name
  ]);

  await Promise.all(
    pricing.prices.map(p =>
      db.query(
        `insert into pricing_price(pricing_id, price_id) values(${pricing_id}, ${p})`
      )
    )
  );
  resp.json({ pricing_id });
  console.log({ pricing_id });
}

async function find(req, resp) {
  const { pmId } = req.params;

  const {
    rows: result
  } = await db.query("select id, name from pricings where id = $1 limit 1", [
    pmId
  ]);
  const pricing = result[0];

  const sql = `select prices.id, prices.price, prices.name, prices.value from prices
                 join pricing_price on prices.id = pricing_price.price_id
                 and pricing_price.pricing_id = $1`;
  const { rows } = await db.query(sql, [pmId]);

  resp.json({ ...pricing, pricing: rows });
}

async function update(req, resp) {
  const { pmId } = req.params;
  const { pricing } = req.body;

  const sql = "update pricings set name = $2 where id = $1";
  await db.query(sql, [pmId, pricing.name]);

  const {
    rows: result
  } = await db.query("select id, name from pricings where id = $1 limit 1", [
    pmId
  ]);
  const pricing1 = result[0];

  const sql1 = `select prices.id, prices.price, prices.name, prices.value from prices
                 join pricing_price on prices.id = pricing_price.price_id
                 and pricing_price.pricing_id = $1`;
  const { rows } = await db.query(sql1, [pmId]);

  resp.json({ ...pricing1, pricing: rows });
}

async function prices(req, resp) {
  const { pmId } = req.params;

  const sql = `select prices.id, prices.price, prices.name, prices.value from prices
                 join pricing_price on prices.id = pricing_price.price_id
                 and pricing_price.pricing_id = $1`;
  const { rows } = await db.query(sql, [pmId]);

  resp.json(rows);
}

/*
{
    price: {
        price: 5,
        name: "New Price",
        value: 30
    }
}
*/
async function priceCreate(req, resp) {
  const { pmId } = req.params;
  const { price } = req.body;

  const result = await db.query(`select nextval('prices_id_seq'::regclass)`);
  const price_id = result.rows[0].nextval;

  const sql = `insert into prices(id, price, name, value) 
                             values($1, $2, $3, $4)`;
  await db.query(sql, [price_id, price.price, price.name, price.value]);

  const sql1 = `insert into pricing_price(pricing_id, price_id) 
                              values($1, $2)`;
  await db.query(sql1, [pmId, price_id]);

  resp.json({ price_id });
}

async function priceDelete(req, resp) {
  const { pmId, priceId } = req.params;

  let sql = "select id from pricing_price where pricing_id = $1 and price_id = $2";
  let result = await db.query(sql, [pmId, priceId]);
  if(result.rows.length === 0) 
    return resp.status(404).send();

  // unlink price configuration
  sql = 'delete from pricing_price where pricing_id = $1 and price_id = $2';
  result = await db.query(sql, [pmId, priceId]);

  resp.status(204).send();
}

// const asyncHandler = fn => (req, res, next) => {
//     return new Promise(fn(req, res, next))
//                .catch(next)
// };

module.exports = {
  all,
  create,
  find,
  update,
  prices,
  priceCreate,
  priceDelete,
};

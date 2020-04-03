var db = require("../db");
var PricingModel = require('../models/pricing_model');
var Price = require('../models/price');
var PriceConfig = require('../models/price_config');

async function all(req, resp) {
  const { rows: pricings } = await PricingModel.all();

  const ret = {};
  for (i = 0; i < pricings.length; i++) {
    const p = pricings[i];
    const { rows } = await PricingModel.prices(p.id);
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
  const pm_id = await PricingModel.create(pricing.name)
  resp.json({ id : pm_id });
}

async function find(req, resp) {
  const { pmId } = req.params;

  const { rows: result } = await PricingModel.find(pmId);
  const pricing = result[0];

  const { rows } = await PricingModel.prices(pmId);
  resp.json({ ...pricing, pricing: rows });
}

async function update(req, resp) {
  const { pmId } = req.params;
  const { pricing } = req.body;

  await PricingModel.update(pmId, pricing.name)

  const { rows: result } = await PricingModel.find(pmId);
  const _pricing = result[0];
  const { rows } = await PricingModel.prices(pmId)

  resp.json({ ..._pricing, pricing: rows });
}

async function prices(req, resp) {
  const { pmId } = req.params;
  const { rows } = await PricingModel.prices(pmId);
  resp.json(rows);
}

async function priceCreate(req, resp) {
  const { pmId } = req.params;
  const { price } = req.body;

  const priceId = await Price.create(price);
  await PriceConfig.create({pricingId: pmId, priceId});
  resp.json({ priceId });
}

async function priceDelete(req, resp) {
  const { pmId, priceId } = req.params;

  let result = await PriceConfig.findBy({pricingId: pmId, priceId});
  if(result.rows.length === 0) 
    return resp.status(404).send();

  await PriceConfig.destroy(result.rows[0].id);
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

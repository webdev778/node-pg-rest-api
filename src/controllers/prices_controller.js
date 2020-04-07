var db = require('../db')
var PricingModel = require('../models/pricing_model')
var Price = require('../models/price')
var PriceConfig = require('../models/price_config')

async function all (req, resp) {
  const { rows: pricings } = await PricingModel.all()

  const ret = {}
  for (let i = 0; i < pricings.length; i++) {
    const p = pricings[i]
    const { rows } = await PricingModel.prices(p.id)
    ret[p.id] = { ...p, pricing: rows.map(r => r.id) }
  }

  // add default pricing
  const { rows: defaultPrices } = await db.query(
    'select id, price, name, value from prices order by price'
  )
  ret.default_pricing = defaultPrices
  resp.json(ret)
  console.log(ret)
}

async function create (req, resp) {
  const { pricing } = req.body
  const pmId = await PricingModel.create(pricing.name)
  resp.json({ id: pmId })
}

async function find (req, resp) {
  const { pmId } = req.params

  const pm = await PricingModel.find(pmId)

  const { rows } = await PricingModel.prices(pmId)
  resp.json({ ...pm, pricing: rows })
}

async function update (req, resp) {
  const { pmId } = req.params
  const { pricing } = req.body

  await PricingModel.update(pmId, { name: pricing.name })

  const pm = await PricingModel.find(pmId)
  const { rows } = await PricingModel.prices(pmId)

  resp.json({ ...pm, pricing: rows })
}

async function prices (req, resp) {
  const { pmId } = req.params
  const { rows } = await PricingModel.prices(pmId)
  resp.json(rows)
}

async function priceCreate (req, resp) {
  const { pmId } = req.params
  const { price } = req.body

  const priceId = await Price.create(price)
  await PriceConfig.create({ pricingId: pmId, priceId })
  resp.json({ priceId })
}

async function priceDelete (req, resp) {
  const { pmId, priceId } = req.params

  const result = await PriceConfig.findBy({ pricingId: pmId, priceId })
  if (!result) { return resp.status(404).send() }

  await PriceConfig.destroy(result.id)
  resp.status(204).send()
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
  priceDelete
}

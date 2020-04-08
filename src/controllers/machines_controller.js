
var Machine = require('../models/machine')
var PricingModel = require('../models/pricing_model')
// const PricingModel = new PricingModelClass()
var assert = require('assert')

async function pricingModel (req, resp) {
  const { machineId } = req.params
  let result

  const m = await Machine.find(machineId)
  if (!m) {
    return resp.status(404).send({ error: 'machine id not found' })
  }

  const pricingId = m.pricing_id
  if (!pricingId) {
    result = await PricingModel.prices(2)
    return resp.json({ default_pricing: result.rows })
  }

  const pm = await PricingModel.find(pricingId)
  assert(!!pm, 'Server Error')

  result = await PricingModel.prices(pricingId)

  return resp.json({
    id: pricingId,
    name: pm.pricing_name,
    pricing: result.rows
  })
}

async function setPriceModel (req, resp) {
  const { machineId, pmId } = req.params

  const pm = await PricingModel.find(pmId)
  if (!pm) {
    return resp.status(404).json({ error: 'invalid pricing model id' })
  }

  const result = await Machine.update(machineId, { pricingId: pmId })
  if (!result.rowCount) return resp.status(404).json({ error: 'invalid machine Id' })

  resp.send()
}

async function unsetPriceModel (req, resp) {
  const { machineId, pmId } = req.params

  const pm = await PricingModel.find(pmId)
  if (!pm) {
    return resp.status(404).json({ error: 'invalid pricing model id' })
  }

  const result = await Machine.update(machineId, { pricingId: null })
  if (!result.rowCount) return resp.status(404).json({ error: 'invalid machine Id' })

  resp.send()
}

module.exports = {
  pricingModel,
  setPriceModel,
  unsetPriceModel
}

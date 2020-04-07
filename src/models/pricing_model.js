var BaseModel = require('./base_model')
var db = require('../db')
class PricingModel extends BaseModel {
  static table = 'pricings'
  // constructor () {
  //   super('pricings')
  // }

  static prices (id) {
    const sql = `select prices.id, prices.price, prices.name, prices.value from prices
    join pricing_price on prices.id = pricing_price.price_id
    and pricing_price.pricing_id = $1 order by prices.id`
    return db.query(sql, [id])
  }
}

module.exports = PricingModel

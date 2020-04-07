var router = require('express').Router()
var priceCtrl = require('../controllers/prices_controller')
var machineCtrl = require('../controllers/machines_controller')

const HTTP_REQ_TYPES = ['get', 'post', 'put', 'patch', 'delete']
const routes = {}

routes['/pricing-models'] = { get: priceCtrl.all, post: priceCtrl.create }
routes['/pricing-models/:pmId'] = { get: priceCtrl.find, put: priceCtrl.update }
routes['/pricing-models/:pmId/prices'] = { get: priceCtrl.prices, post: priceCtrl.priceCreate }
routes['/pricing-models/:pmId/prices/:priceId'] = { delete: priceCtrl.priceDelete }
routes['/machines/:machineId/prices'] = { get: machineCtrl.pricingModel }
routes['/machines/:machineId/prices/:pmId'] = { put: machineCtrl.setPriceModel, delete: machineCtrl.unsetPriceModel }

function routeMapping (rt, rs) {
  for (const p in rs) {
    HTTP_REQ_TYPES.forEach(t => rs[p][t] && rt[t](p, rs[p][t]))
  }
}
routeMapping(router, routes)

function listRoutes (rs) {
  console.log('TYPE\t\tURL')
  for (const p in rs) {
    HTTP_REQ_TYPES.forEach(t => rs[p][t] && console.log(`${t}\t${p}`))
  }
}
listRoutes(routes)

module.exports = router

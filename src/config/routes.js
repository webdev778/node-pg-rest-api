var router = require('express').Router();
var priceCtrl = require('../controllers/prices_controller');
var machineCtrl = require('../controllers/machines_controller');

const HTTP_REQ_TYPES = ['get', 'post', 'put', 'patch', 'delete']
const [GET, POST, PUT, PATCH, DELETE] = HTTP_REQ_TYPES;
const routes = {};

routes['/pricing-models'] = { [GET]: priceCtrl.all, [POST]: priceCtrl.create };
routes['/pricing-models/:pmId'] = { [GET]: priceCtrl.find, [PUT]: priceCtrl.update };
routes['/pricing-models/:pmId/prices'] = { [GET]: priceCtrl.prices, [POST]: priceCtrl.priceCreate };
routes['/pricing-models/:pmId/prices/:priceId'] = { [DELETE]: priceCtrl.priceDelete };

routes['/machines/:machineId/prices'] = { [GET]: machineCtrl.prices };
routes['/machines/:machineId/prices/:pmId'] = { [PUT]: machineCtrl.setPriceModel, [DELETE]: machineCtrl.unsetPriceModel };

(function routeMapping(rt, rs) {
  for (const p in rs) {
    HTTP_REQ_TYPES.forEach(t => rs[p][t] && rt[t](p, rs[p][t]))
  }  
})(router, routes);

(function listRoutes(rs){
  console.log(`TYPE\t\tURL`)
  for (const p in rs) {
    HTTP_REQ_TYPES.forEach(t => rs[p][t] && console.log(`${t}\t${p}`));
  }    
})(routes);


module.exports=router;
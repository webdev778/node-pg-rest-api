var router = require('express').Router(),
    pricingModel = require('./model/pricingModel');

router.get('/', pricingModel.all)
      .post('/', pricingModel.create);

router.route('/:pmId').get(pricingModel.find)
                      .put(pricingModel.update);

router.route('/:pmId/prices').get(pricingModel.prices)
                             .post(pricingModel.priceCreate);

router.route('/:pmId/prices/:priceId').delete(pricingModel.priceDelete);

module.exports=router;
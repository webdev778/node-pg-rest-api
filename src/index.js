var router = require('express').Router();
var pricingModelsRouter = require('./pricingModels');
var machinesRouter = require('./machines');

router.use('/pricing-models', pricingModelsRouter);
router.use('/machines', machinesRouter);

module.exports=router;
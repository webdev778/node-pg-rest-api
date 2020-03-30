var router = require('express').Router(),
    machine = require('./model/machine');

router.route('/:machineId/prices').get(machine.prices);

router.route('/:machineId/prices/:pmId').put(machine.setPriceModel)
                                        .delete(machine.unsetPriceModel);

module.exports = router;

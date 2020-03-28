var router = require('express').Router(),
    machine = require('./model/machine');

router.route('/:machine-id/prices').get(machine.mokeup);

router.route('/:machine-id/prices/:pm-id').put(machine.mokeup)
                                          .delete(machine.mokeup);

module.exports = router;

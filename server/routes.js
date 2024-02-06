const router = require('express').Router();

const userController = require('./controllers/userController')
const waterpumpController = require('./controllers/waterpumpController')
const partsController = require('./controllers/partsControler')
const toolsController = require('./controllers/toolsManager')
const systemsControler = require('./controllers/systemsControler')
const machinesControler = require('./controllers/machinesControler')
const pipesControler = require('./controllers/pipesControler')

router.use('/users', userController);
router.use('/products/waterpumps', waterpumpController);
router.use('/products/parts', partsController);
router.use('/products/tools', toolsController);
router.use('/products/irigationSystems', systemsControler);
router.use('/products/powerMachines', machinesControler);
router.use('/products/pipes', pipesControler);


module.exports = router
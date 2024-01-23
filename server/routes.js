const router = require('express').Router();

const userController = require('./controllers/userController')
const waterpompController = require('./controllers/waterpompController')
const partsController = require('./controllers/partsControler')
const toolsController = require('./controllers/toolsManager')
const systemsControler = require('./controllers/systemsControler')
const machinesControler = require('./controllers/machinesControler')
const pipesControler = require('./controllers/pipesControler')

router.use('/users', userController);
router.use('/products/waterpomps', waterpompController);
router.use('/products/parts', partsController);
router.use('/products/tools', toolsController);
router.use('/products/systems', systemsControler);
router.use('/products/machines', machinesControler);
router.use('/products/pipes', pipesControler);


module.exports = router
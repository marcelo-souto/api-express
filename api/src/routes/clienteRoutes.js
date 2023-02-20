const { Router } = require('express')
const checkToken = require('../middlewares/checkToken')
const clienteController = require('../controllers/clienteController.js')

const router = Router()

router.get('/cliente/att', clienteController.getAutenticate)
router.post('/cliente/auth', clienteController.auth)
router.post('/cliente/create', clienteController.post)
router.put('/cliente/update', checkToken, clienteController.update)
router.delete('/cliente/delete', clienteController.delete)

module.exports = router
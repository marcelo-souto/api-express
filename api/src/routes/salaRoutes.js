const { Router } = require('express');
const salaController = require('../controllers/salaController.js');
const checkToken = require('../middlewares/checkToken.js')

const router = Router()

router.post('/sala/create', checkToken, salaController.create)

module.exports = router
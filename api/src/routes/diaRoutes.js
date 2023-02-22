const { Router } = require('express')
const diaController = require('../controllers/diaController.js')

const router = Router()

router.get('/dia/create', diaController.create)

module.exports = router
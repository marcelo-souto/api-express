const { Router } = require('express');
const filmeController = require('../controllers/filmeController.js');
const checkToken = require('../middlewares/checkToken.js');

const router = Router();

router.post('/filme/create', checkToken, filmeController.create);

module.exports = router;

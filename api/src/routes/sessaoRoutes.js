const { Router } = require('express');
const sessaoController = require('../controllers/sessaoController.js');
const checkToken = require('../middlewares/checkToken.js');

const router = Router();

router.post('/sessao/create', checkToken, sessaoController.create);
router.put('/sessao/update', checkToken, sessaoController.update);
router.delete('/sessao/delete', checkToken, sessaoController.delete);

router.get('/sessao/get', sessaoController.getAll);
router.get('/sessao/getbyid', sessaoController.getById);

module.exports = router;
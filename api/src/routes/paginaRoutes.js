const paginaController = require('../controllers/paginaController');
const { Router } = require('express');
const checkToken = require('../middlewares/checkToken');

const router = Router();

router.post('/pagina/create', checkToken, paginaController.create);
router.put('/pagina/update', checkToken, paginaController.update);
router.get('/pagina/get', checkToken, paginaController.getAll);

router.get('/pagina/get/nome/:nome', paginaController.getByNome);
router.get('/pagina/get/id/:paginaId', paginaController.getById);

router.delete('/pagina/delete/:paginaId', checkToken, paginaController.delete);

module.exports = router;

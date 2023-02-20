const { Router } = require('express');
const checkToken = require('../middlewares/checkToken.js');
const administradorController = require('../controllers/administradorController.js');

const router = Router();

router.post('/admin/create', administradorController.create);
router.post('/admin/auth', administradorController.auth);
router.get('/admin/get', checkToken, administradorController.getInfo);
router.put('/admin/update', checkToken, administradorController.update);
router.delete('/admin/delete', checkToken, administradorController.delete)

module.exports = router;

const { Router } = require('express');
const product = require('../controllers/Products');
const category = require('../controllers/Categories');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/product', product);
router.use('/category', category);

module.exports = router;

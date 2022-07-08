const { Router } = require('express');
const product = require('../controllers/Products');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/product', product);

module.exports = router;

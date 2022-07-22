const { Router } = require("express");
const product = require("../controllers/Products");
const category = require("../controllers/Categories");
const guesProduct = require("../controllers/Guess");
const userReview = require("../controllers/User");
const guesOrder = require("../controllers/GuessOrders");
const guesProductOrder = require("../controllers/ProductOrder");
const adminOrder = require("../controllers/AdminOrders");
const users = require("../controllers/User");
const rol = require("../controllers/Rol");
const state = require("../controllers/State");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/guess/product", guesProduct);
router.use("/admin/product", product);
router.use("/admin/category", category);
router.use("/user/product", userReview);
router.use("/guess/order", guesOrder);
router.use("/guess/product", guesProductOrder);
router.use("/admin/order", adminOrder);
router.use("/admin/state", state);
router.use("/user", users);


module.exports = router;

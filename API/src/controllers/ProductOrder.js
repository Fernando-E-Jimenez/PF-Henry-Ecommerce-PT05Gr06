const { Product, Order } = require("../db");
const upload = require("../libs/storage");
const { Router } = require("express");
const router = Router();

/*..poder agregar items a mi carrito de compras desde el listado o desde a página de 
detalles de un producto, para poder comprarlos despues.  - Guest */

router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { cant, state = "created" } = req.body;
    if (!cant)
      return res.status(400).send("Faltan datos necesarios (cantidad).");

    let prodcutId = await Product.findAll({
      where: { id: id },
    });

    const prodcuts = prodcutId.filter((e) => e.id == id);
    let mount = prodcuts.map((e) => {
      return e.dataValues.price;
    });
    let cantT = cant * mount;
    let orderNew = await Order.create({
      state,
      mont: cantT,
    });

    orderNew.addProduct(prodcutId);
    const order = await Order.findByPk(parseInt(idorder));
    const prod = await Product.findByPk(parseInt(id));
    const projects = await prod.getOrders();
    const p1 = projects[0];
    console.log(p1);
    const x = p1.productXorder.cant;

    await order.addProduct(prod, { through: { cant: cant } });
    res.status(200).send(orderNew);
  } catch (e) {
    res.status(400).send("Error: " + e);
  }
});

/////////////////////////////////////////////////////////

router.put("/:id/order/:idorder", async (req, res) => {
  try {
    const { id, idorder } = req.params;
    const { cant } = req.body;
    if (!cant)
      return res.status(400).send("Faltan datos necesarios (cantidad).");
    const order = await Order.findByPk(parseInt(idorder));
    const prod = await Product.findByPk(parseInt(id));
    let priceProd = prod.dataValues.price;
    let priceA = cant * priceProd;
    let montOrder = order.dataValues.mont;
    montOrder = parseInt(montOrder) + parseInt(priceA);
    console.log(montOrder);
    const newPrice = await Order.update(
      { mont: montOrder },
      { where: { id: order.dataValues.id } }
    );
    await order.addProducts(prod);
    await order.addProduct(prod, { through: { cant: cant } });
    res.status(200).send(newPrice);
  } catch (e) {
    res.status(400).send("Error: " + e);
  }
});

module.exports = router;

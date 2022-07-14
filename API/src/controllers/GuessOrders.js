const { Order, Product } = require("../db");
const upload = require('../libs/storage');
const { Router } = require('express');
const router = Router();
  
  
  // ..sacar items de mi carrito, en caso que decida no quererlos.
  router.delete("/:idorder/product/:id", async (req, res) => {
    try{
        const {idorder, id} = req.params;
        const order = await Order.findByPk(parseInt(idorder));
        const prod1 = await Product.findByPk(parseInt(id));
        const projects = await order.getProducts();
        const p1 = projects[0];
        const x = p1.productXorder.cant


        let mountProd = prod1.dataValues.price
        let priceA = parseInt(mountProd) * parseInt(x)
        let montOrder = order.dataValues.mont
        montOrder = parseInt(montOrder) - parseInt(priceA)
        const newPrice = await Order.update({mont: montOrder} , { where:{id: order.dataValues.id}})
        await order.removeProducts(prod1)
        res.status(200).send("borradooo");
    }catch (e) {
    res.status(400).send("Error: " + e)
  }
  })
  
  // ..editar cantidades de los items de mi carrito, en caso que quiera mas o menos 
  // cantidad de un item en particular.
  
  router.put("/:idorder/product/:id", async (req, res) => {
      try{
          const {idorder, id} = req.params;
          const {cant} = req.body;
          const order = await Order.findByPk(parseInt(idorder));
          const prod = await Product.findByPk(parseInt(id));
          let priceProd = prod.dataValues.price
          let priceA= cant * priceProd
          const newPrice = await Order.update({mont: priceA} , { where:{id: order.dataValues.id}})
          
          await order.addProduct(prod ,{ through: { cant: cant }})
          res.status(200).send(newPrice);
      }catch (e) {
      res.status(400).send("Error: " + e)
  }
  })
  


  //.poder comprar todos los items de un mi carrito. (checkout) 
  router.put("/:idorder/checkout", async (req, res) => {
    try{
      const {idorder} = req.params;
      const {
        name,
        dni,
        address,
      } = req.body
    }catch (e) {
    res.status(400).send("Error: " + e)
}
})

  module.exports = router
const { Order, Product } = require("../db");
const upload = require('../libs/storage');
const { Router } = require('express');
const router = Router();
  
  
  // ..sacar items de mi carrito, en caso que decida no quererlos.
  router.put("/:idorder/product/:id", async (req, res) => {
    try{
        const {idorder, id} = req.params;
        const order = await Order.findByPk(parseInt(idorder));
        const prod1 = await Product.findByPk(parseInt(id));
        let mountProd = prod1.dataValues.price
        let montOrder = order.dataValues.mont
        montOrder = parseInt(montOrder) - parseInt(mountProd)
        await order.removeProducts(prod1)
        // const newCant = await Order.update({cant: cant} , { where:{id: idorder}})
        res.status(200).send("borradooo");
    }catch (e) {
    res.status(400).send("Error: " + e)
  }
  })
  
  // ..editar cantidades de los items de mi carrito, en caso que quiera mas o menos 
  // cantidad de un item en particular.
  
  router.put("/order/:idorder", async (req, res) => {
      try{
          const {idorder} = req.params;
          const {cant} = req.body;
              const newCant = await Order.update({cant: cant} , { where:{id: idorder}})
              res.status(200).send(newCant);
      }catch (e) {
      res.status(400).send("Error: " + e)
  }
  })
  
  module.exports = router
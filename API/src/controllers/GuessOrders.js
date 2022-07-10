const { Order, Product } = require("../db");
const upload = require('../libs/storage');
const { Router } = require('express');
const router = Router();
  
  
  // ..sacar items de mi carrito, en caso que decida no quererlos.
  router.put("/:idorder/:id", async (req, res) => {
    try{
        const {idorder} = req.params;
        const {x=0} = req.body;
        const prod = await Order.findByPk(parseInt(idorder));
        console.log(prod)
        await prod.setProducts(x)
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
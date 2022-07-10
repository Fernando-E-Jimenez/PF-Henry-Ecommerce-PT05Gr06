const { Product, Order } = require("../db");
const upload = require('../libs/storage');
const { Router } = require('express');
const router = Router();


/*..poder agregar items a mi carrito de compras desde el listado o desde a página de 
detalles de un producto, para poder comprarlos despues.  - Guest */

router.post("/:id/order", async (req, res) => {
    try{
        const {id} = req.params
        
        
        const {
            cant,
            state="created",
             
        } = req.body;
        let orderNew = await Order.create({
            cant,
            state
        });
        
        let prodcutId = await Product.findAll({
            where:{id:id}
        }) 
        
        orderNew.addProduct(prodcutId)
        res.status(200).send(orderNew);
    }catch (e) {
    res.status(400).send("Error: " + e)
  }
  })

  module.exports = router
const { Product, Order } = require("../db");
const upload = require('../libs/storage');
const { Router } = require('express');
const router = Router();



/*..poder agregar items a mi carrito de compras desde el listado o desde a página de 
detalles de un producto, para poder comprarlos despues.  - Guest */

router.post("/:id/order/:idorder", async (req, res) => {
    try{
        const {id, idorder} = req.params
   
        
        const {
            cant,
            state="created",
        } = req.body;


        let prodcutId = await Product.findAll({
            where:{id:id}
        }) 

        const prodcuts = prodcutId.filter((e) => e.id == id)
        let mount = prodcuts.map((e) => { return e.dataValues.price })
        let cantT= cant * mount
        let orderNew = await Order.create({
            state,
            mont: cantT
        });
        orderNew.addProduct(prodcutId)
         const order = await Order.findByPk(parseInt(idorder));
         const prod = await Product.findByPk(parseInt(id));
         const projects = await prod.getOrders();
         const p1 = projects[0];
         console.log(p1);
         const x = p1.productXorder.cant
         
         await order.addProduct(prod ,{ through: { cant: cant }})
        res.status(200).send(orderNew);
    }catch (e) {
    res.status(400).send("Error: " + e)
  }
  })

/////////////////////////////////////////////////////////


  router.put("/:id/order/:idorder", async (req, res) => {
    try{
        const {id, idorder} = req.params
        const {
            cant,
        } = req.body;
        const order = await Order.findByPk(parseInt(idorder));
        const prod = await Product.findByPk(parseInt(id));
        await order.addProducts(prod);

        await order.addProduct(prod ,{ through: { cant: cant }}) 
        res.status(200).send("cambiado");
    }catch (e) {
    res.status(400).send("Error: " + e)
  }
  })

  module.exports = router
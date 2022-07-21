const { Order, Product, User, Category, Rol} = require("../db");
const upload = require("../libs/storage");
const { Router } = require("express");
const router = Router();
const {mercadopago} = require('../utils/mercadoPago')


// ..sacar items de mi carrito, en caso que decida no quererlos.
router.delete("/:idorder/product/:id", async (req, res) => {
  try {
    const { idorder, id } = req.params;
    const order = await Order.findByPk(parseInt(idorder));
    const prod1 = await Product.findByPk(parseInt(id));
    const projects = await order.getProducts();
    const p1 = projects[0];
    const x = p1.productXorder.cant;

    let mountProd = prod1.dataValues.price;
    let priceA = parseInt(mountProd) * parseInt(x);
    let montOrder = order.dataValues.mont;
    montOrder = parseInt(montOrder) - parseInt(priceA);
    const newPrice = await Order.update(
      { mont: montOrder },
      { where: { id: order.dataValues.id } }
    );
    await order.removeProducts(prod1);
    res.status(200).send("borradooo");
  } catch (e) {
    res.status(400).send("Error: " + e);
  }
});

// ..editar cantidades de los items de mi carrito, en caso que quiera mas o menos
// cantidad de un item en particular.

router.put("/:idorder/product/:id", async (req, res) => {
  try {
    const { idorder, id } = req.params;
    const { cant } = req.body;
    if (!cant)
      return res.status(400).send("Faltan datos necesarios (cantidad).");
    const order = await Order.findByPk(parseInt(idorder));
    const prod = await Product.findByPk(parseInt(id));
    let montT = order.dataValues.mont; //monto sin actualizar
    let priceProd = prod.dataValues.price; //precio producto
    let projects = await order.getProducts(); // -
    const p1 = projects[0]; //                    |---- tomar la cantidad del producto y de la orden sin actualizar
    const x = p1.productXorder.cant; //           -
    let priceB = priceProd * x; // precio que va cambiar
    let montT1 = montT - priceB;
    let priceA = cant * priceProd; // cantidad actualizada por el precio del producto
    let montTF = montT1 + priceA;
    await Order.update(
      { mont: montTF },
      { where: { id: order.dataValues.id } }
    );

    await order.addProducts(prod, { through: { cant: cant } });
    res.status(200).send("actualizado");
  } catch (e) {
    res.status(400).send("Error: " + e);
  }
});

  //.poder comprar todos los items de un mi carrito. (checkout)
  router.put("/:idorder/user/:iduser/checkout", async (req, res) => {
    let array={};
    try{
      const {idorder,iduser} = req.params;
      const {
        name,
        dni,
        address,
      } = req.body
      
      if (!name) return res.status(400).send("Faltan datos necesarios (name).");
    if (!dni) return res.status(400).send("Faltan datos necesarios (dni).");
    if (!address) return res.status(400).send("Faltan datos necesarios (address).");
    const order = await Order.findByPk(parseInt(idorder));
    const user = await User.findByPk(parseInt(iduser));


let userNew = await User.update({
      name,
      dni,
      orderId: order.dataValues.id
    },
    {where: {id: user.dataValues.id}});

    
    let addresNew = await Order.update(
      {address},
      {where: { id: order.dataValues.id }}
    );
    let projects = await order.getProducts(); // -
    let productsClient = await Promise.all(projects.map( async (f)=>{
      return{
        id: f.dataValues.id,
      };
    }
    ));
       let claves = Object.keys(productsClient); 
    for(let i=0; i< claves.length; i++){
  let clave = claves[i];
  let nameCategor = await Category.findByPk(parseInt(clave));
  if(nameCategor){
    array = {
      id: claves[i],
      name: nameCategor.dataValues.name
    }
  }
}

      let productsCar = projects.map( e=> {
        return{
          id: e.dataValues.id,
          name: e.dataValues.name,
          price: e.dataValues.price,
          description: e.dataValues.description,
          cant: e.dataValues.productXorder.cant,
          category: array
        };
      });

      let users = {
        "name": user.dataValues.name,
        "dni": user.dataValues.dni,
        // "user": user.dataValues.user,
        "email": user.dataValues.email,
        "mont": order.dataValues.mont
      }
      


      let preference = {
        purpose: "wallet_purchase",
        items: [productsCar],
        external_reference: `${order.dataValues.id}`,
        payer: [users],
        back_urls: {
          "success": "http://localhost:8080/feedback",
          "failure": "http://localhost:8080/feedback",
          "pending": "http://localhost:8080/feedback"
        },
        auto_return: "approved",
        payment_methods: {
          excluded_payment_types: [{ id: "ticket" }],
        },
        shipments:{
          cost: order.dataValues.mont,
          mode: "not_specified",
      }
    }
      console.log(preference)
//  const response = await mercadopago.preferences
//    .create(preference)
//    .then(function (response) {
//        // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
//    const preferenceId = response.body.id
//       })
//    .catch(function (error) {
//      console.log(error);
//    });
    
    

res.status(200).send("actualizado");
    }catch (e) {
    res.status(400).send("Error: " + e)
}
})

  module.exports = router

const { Review, User, Product, Order, State, Car } = require("../db");
const { transporter } = require("../utils/nodeMailer");
const { MAILUSER } = process.env;
const { Router } = require("express");
const router = Router();
const bcrypt = require('bcrypt');



// Ruta para Consultar los productos en el carrito del usuario

router.get("/:idUser/car/", async (req, res) => {
  try {
    const { idUser } = req.params;
    if (!idUser) return res.status(400).send("Faltan datos necesarios (idUser).");
    if (isNaN(parseInt(idUser)))
      return res
        .status(400)
        .send("Formato de datos invalido (idUser) debe ser un numero.");

    const user = await User.findByPk(idUser);
    // const user = await User.findOne({ where: { email: idUser } });
    if (!user) return res.status(400).send("El usuario no existe.");

    const car = await user.getProducts({ joinTableAttributes: ['cant'] });
    if (!car || car.length === 0) return res.status(200).send("El Usuario no tiene productos en el carrito.");

    return res.status(200).json(car);
  } catch (error) {
    return res.status(400).send({ message: "Error: " + error });
  }
});

// Ruta para Añadir un Producto al carrito del usuario
// Sirve tambien para Actualizar la Cantidad de Productos de Este

router.post("/:idUser/car/", async (req, res) => {
  try {
    const { idUser } = req.params;
    const { id, cant } = req.body;
    if (!id) return res.status(400).send("Faltan datos necesarios (id).");
    if (!idUser) return res.status(400).send("Faltan datos necesarios (idUser).");
    if (!cant) return res.status(400).send("Faltan datos necesarios (cant).");
    if (isNaN(parseInt(id)))
      return res
        .status(400)
        .send("Formato de datos invalido (id) debe ser un numero.");
    if (isNaN(parseInt(idUser)))
      return res
        .status(400)
        .send("Formato de datos invalido (idUser) debe ser un numero.");
    if (isNaN(parseInt(cant)))
      return res
        .status(400)
        .send("Formato de datos invalido (cant) debe ser un numero.");

    const user = await User.findByPk(idUser);
    // const user = await User.findOne({ where: { email: idUser } });
    if (!user) return res.status(400).send("El usuario no existe.");
    const product = await Product.findByPk(id);
    if (!product) return res.status(400).send("El producto no existe.");

    await user.addProduct(id, { through: { cant: cant } });
    const car = await user.getProducts({ joinTableAttributes: ['cant'] });
    return res.status(200).send(car);
  } catch (error) {
    return res.status(400).send({ message: "Error: " + error });
  }
});

// Ruta para Añadir multiplex Productos al carrito del usuario

router.post("/:idUser/cars/", async (req, res) => {
  try {
    const { idUser } = req.params;
    const { products } = req.body;
    if (!products) return res.status(400).send("Faltan datos necesarios (id).");
    if (!idUser) return res.status(400).send("Faltan datos necesarios (idUser).");
    if (isNaN(parseInt(idUser)))
      return res
        .status(400)
        .send("Formato de datos invalido (idUser) debe ser un numero.");
    if (!Array.isArray(products))
      return res
        .status(400)
        .send("Formato de datos invalido (products) debe ser un Array.");

    const user = await User.findByPk(idUser);
    // const user = await User.findOne({ where: { email: idUser } });
    if (!user) return res.status(400).send("El usuario no existe.");

    products.map(async (p) => {
      await user.addProduct(p.id, { through: { cant: p.cant } });
    })
    const car = await user.getProducts({ joinTableAttributes: ['cant'] });
    return res.status(200).send(car);
  } catch (error) {
    return res.status(400).send({ message: "Error: " + error });
  }
});

// Ruta para Remover lo Productos del carrito del usuario

router.delete("/:idUser/car/reset", async (req, res) => {
  try {
    const { idUser } = req.params;
    if (!idUser) return res.status(400).send("Faltan datos necesarios (idUser).");
    if (isNaN(parseInt(idUser)))
      return res
        .status(400)
        .send("Formato de datos invalido (idUser) debe ser un numero.");

    const user = await User.findByPk(idUser);
    if (!user) return res.status(400).send("El usuario no existe.");
    const car = await user.getProducts();
    car.map(async (p) => {
      await user.removeProduct(p.dataValues.id);
    })
    return res.status(200).send("Productos Removidos del Carrito.");
  } catch (error) {
    return res.status(400).send({ message: "Error: " + error });
  }
});


// Ruta para Remover un Producto del carrito del usuario

router.delete("/:idUser/car/", async (req, res) => {
  try {
    const { idUser } = req.params;
    const { id } = req.body;
    if (!id) return res.status(400).send("Faltan datos necesarios (id).");
    if (!idUser) return res.status(400).send("Faltan datos necesarios (idUser).");
    if (isNaN(parseInt(id)))
      return res
        .status(400)
        .send("Formato de datos invalido (id) debe ser un numero.");
    if (isNaN(parseInt(idUser)))
      return res
        .status(400)
        .send("Formato de datos invalido (idUser) debe ser un numero.");

    const user = await User.findByPk(idUser);
    // const user = await User.findOne({ where: { email: idUser } });
    if (!user) return res.status(400).send("El usuario no existe.");
    const product = await Product.findByPk(id);
    if (!product) return res.status(400).send("El producto no existe.");

    await user.removeProduct(id);
    const car2 = await user.getProducts({ joinTableAttributes: ['cant'] });

    return res.status(200).send(car2);
  } catch (error) {
    return res.status(400).send({ message: "Error: " + error });
  }
});


router.post("/:id/review", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, star } = req.body;
    if (!id) return res.status(400).send("Faltan datos necesarios (id).");
    if (!description)
      return res.status(400).send("Faltan datos necesarios (description).");
    if (!star) return res.status(400).send("Faltan datos necesarios (star).");
    if (isNaN(parseInt(id)))
      return res
        .status(400)
        .send("Formato de datos invalido (id) debe ser un numero.");
    if (isNaN(parseInt(star)))
      return res
        .status(400)
        .send("Formato de datos invalido (star) debe ser un numero.");
    if (!isNaN(parseInt(description)))
      return res
        .status(400)
        .send(
          "Formato de datos invalido (description) debe ser una cadena texto."
        );
    console.log(description, star);
    let reviewNew = await Review.create({
      description,
      star,
      productId: id,
    });
    res.status(200).send(reviewNew);
  } catch (e) {
    return res.status(400).send("Error: " + e);
  }
});


// Ruta para Actualizar los datos del Usuario

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, password, dni, email } = req.body;
    if (!id) return res.status(400).send("Faltan datos necesarios (id).");
    if (!name) return res.status(400).send("Faltan datos necesarios (name).");
    if (!email) return res.status(400).send("Faltan datos necesarios (email).");
    if (isNaN(parseInt(id)))
      return res
        .status(400)
        .send("Formato de datos invalido (id) debe ser un numero.");

    await bcrypt.hash(password, 10, async function (err, hash) {
      try {
        const user = await User.update(
          {
            name: name.toLowerCase(),
            password: hash1,
            email,
            dni,
          },
          {
            where: {
              id: id,
            },
          }
        );
        console.log(user);
        if (user[0] === 1) {
          let user1 = await User.findByPk(id);
          // let user1 = await User.findOne({ where: { email: id } });
          return res.status(200).json(user1);
        } else if (!user) {
          return res.status(404).json({ message: "Error: El Usuario no Existe." });
        } else {
          return res
            .status(404)
            .json({ message: "Error: Usuario no Actualizado." });
        }
      } catch (e) {
        return res.status(400).send({ message: "Error: " + e });
      }
    });
  } catch (e) {
    return res.status(400).send({ message: "Error: " + e });
  }
});

// Ruta para consultar los datos del Usuario

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send("Faltan datos necesarios (id).");
    if (isNaN(parseInt(id)))
      return res
        .status(400)
        .send("Formato de datos invalido (id) debe ser un numero.");
    const user = await User.findByPk(id);
    // const user = await User.findOne({ where: { email: id } });
    if (!user) return res.status(400).send("Usuario no encontrado");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).send({ message: "Error: " + error });
  }
});


//RUTA CREACION DE ORDER - ACTUALIZACION USER Y CART -> OPRODCUTXORDER

router.post("/:iduser/order", async (req, res) => {
  try {
    let montT = 0;
    const { iduser } = req.params;
    const {
      name,
      dni,
      address,
    } = req.body

    if (!name) return res.status(400).send("Faltan datos necesarios (name).");
    if (!dni) return res.status(400).send("Faltan datos necesarios (dni).");
    if (!address) return res.status(400).send("Faltan datos necesarios (address).");

    const user = await User.findByPk(parseInt(iduser));
    // const user = await User.findOne({ where: { email: id } });
    let projects = await user.getProducts();
    let idState = await State.findOne({
      where: { name: "creada" }
    });

    let productsOrder = projects.map(e => {
      let mont1 = e.dataValues.price * e.dataValues.car.cant;
      montT = montT + mont1
      return {
        id: e.dataValues.id,
        cant: e.dataValues.car.cant,
      };
    });

    let order = await Order.create({
      address,
      mont: montT,
      stateId: idState.dataValues.id,
      userId: user.dataValues.id
    });
    let userNew = await User.update({
      name: name.toLowerCase(),
      dni,
      orderId: order.dataValues.id
    },
      { where: { id: iduser } });

    productsOrder.map(async (e) => {
      await order.addProduct(e.id, { through: { cant: e.cant } });
    });
    await Car.destroy({
      where: {
        userId: iduser
      }
    });
    await transporter.sendMail({
      from: '"App Vinos" <' + MAILUSER + '>', // sender address
      to: user.dataValues.email, // list of receivers
      subject: "Orden de compra Creada", // Subject line
      text: "AppVinos le informa que su orden de compra se ha registrado satisfactoriamente.", // plain text body
      // html: "<b>Hello world?</b>", // html body
    });
    return res.status(200).send(order);
  }
  catch (e) {
    return res.status(400).send("Error: " + e)
  }
});


// Ruta para Listar las ordenes del usuario

router.get("/:iduser/order", async (req, res) => {
  try {
    const { iduser } = req.params;
    if (!iduser) return res.status(400).send("Faltan datos necesarios (iduser).");
    if (isNaN(parseInt(iduser)))
      return res
        .status(400)
        .send("Formato de datos invalido (iduser) debe ser un numero.");
    const user = await User.findByPk(iduser);
    // const user = await User.findOne({ where: { email: iduser } });
    if (!user) return res.status(400).send("Usuario no encontrado");
    const orders = await user.getOrders({
      include: [
        { model: State },
        {
          model: Product,
          through: {
            attributes: ['cant']
          }
        }]
    });
    return res.status(200).json(orders);
  }
  catch (e) {
    return res.status(400).send("Error: " + e)
  }
});

// Ruta para Listar una orden del usuario

router.get("/:iduser/order/:idOrder", async (req, res) => {
  try {
    const { iduser, idOrder } = req.params;
    if (!iduser) return res.status(400).send("Faltan datos necesarios (iduser).");
    if (isNaN(parseInt(iduser)))
      return res
        .status(400)
        .send("Formato de datos invalido (iduser) debe ser un numero.");
    if (!idOrder) return res.status(400).send("Faltan datos necesarios (idOrder).");
    if (isNaN(parseInt(idOrder)))
      return res
        .status(400)
        .send("Formato de datos invalido (idOrder) debe ser un numero.");
    const user = await User.findByPk(iduser);
    if (!user) return res.status(400).send("Usuario no encontrado");

    const order = await Order.findByPk(idOrder, {
      include: [
        { model: State },
        {
          model: Product,
          through: {
            attributes: ['cant']
          }
        }
      ]
    })
    await transporter.sendMail({
      from: '"App Vinos" <' + MAILUSER + '>', // sender address
      to: user.dataValues.email, // list of receivers
      subject: "Orden de compra Cancelada", // Subject line
      text: "AppVinos le informa que su orden de compra se ha registrado satisfactoriamente.", // plain text body
      // html: "<b>Hello world?</b>", // html body
    });
    return res.status(200).json(order);
  }
  catch (e) {
    return res.status(400).send("Error: " + e)
  }
});


// Ruta para Cancelar una orden del usuario

router.delete("/:iduser/order/:idOrder", async (req, res) => {
  try {
    const { iduser, idOrder } = req.params;
    if (!iduser) return res.status(400).send("Faltan datos necesarios (iduser).");
    if (isNaN(parseInt(iduser)))
      return res
        .status(400)
        .send("Formato de datos invalido (iduser) debe ser un numero.");
    if (!idOrder) return res.status(400).send("Faltan datos necesarios (idOrder).");
    if (isNaN(parseInt(idOrder)))
      return res
        .status(400)
        .send("Formato de datos invalido (idOrder) debe ser un numero.");
    const user = await User.findByPk(iduser);
    // const user = await User.findOne({ where: { email: id } });    
    if (!user) return res.status(400).send("Usuario no encontrado");
    const order = await Order.findByPk(idOrder);
    if (!order) return res.status(400).send("Orden no encontrado");
    let idState = await State.findOne({
      where: { name: "cancelada" }
    });
    const update = await Order.update(
      {
        stateId: idState.dataValues.id
      },
      {
        where: {
          id: idOrder
        }
      }
    );
    await transporter.sendMail({
      from: '"App Vinos" <' + MAILUSER + '>', // sender address
      to: user.dataValues.email, // list of receivers
      subject: "Orden de compra Cancelada", // Subject line
      text: "AppVinos le informa que su orden de compra no. " + idOrder + " ha sido cancelada.", // plain text body
      // html: "<b>Hello world?</b>", // html body
    });
    return res.status(200).json("Orden Cancelada");
  }
  catch (e) {
    return res.status(400).send("Error: " + e)
  }
});


// Ruta agregar un Producto a Favoritos

router.get("/:idUser/favorite", async (req, res) => {
  try {
    const { idUser } = req.params;
    if (!idUser) return res.status(400).send("Faltan datos necesarios (idUser).");
    if (isNaN(parseInt(idUser)))
      return res
        .status(400)
        .send("Formato de datos invalido (idUser) debe ser un numero.");

    const user = await User.findByPk(idUser);
    if (!user) return res.status(400).send("El usuario no existe.");
    const Favorites = await user.getFavorite();
    return res.status(200).send(Favorites);
  } catch (error) {
    return res.status(400).send({ message: "Error: " + error });
  }
});

// Ruta agregar un Producto a Favoritos

router.post("/:idUser/favorite", async (req, res) => {
  try {
    const { idUser } = req.params;
    const { id } = req.body;
    if (!id) return res.status(400).send("Faltan datos necesarios (id).");
    if (!idUser) return res.status(400).send("Faltan datos necesarios (idUser).");
    if (isNaN(parseInt(id)))
      return res
        .status(400)
        .send("Formato de datos invalido (id) debe ser un numero.");
    if (isNaN(parseInt(idUser)))
      return res
        .status(400)
        .send("Formato de datos invalido (idUser) debe ser un numero.");

    const user = await User.findByPk(idUser);
    // const user = await User.findOne({ where: { email: idUser } });
    if (!user) return res.status(400).send("El usuario no existe.");
    const product = await Product.findByPk(id);
    if (!product) return res.status(400).send("El producto no existe.");

    await user.addFavorite(id);
    const Favorites = await user.getFavorite();
    return res.status(200).send(Favorites);
  } catch (error) {
    return res.status(400).send({ message: "Error: " + error });
  }
});


// Ruta Sacar un Producto de Favoritos

router.delete("/:idUser/favorite", async (req, res) => {
  try {
    const { idUser } = req.params;
    const { id } = req.body;
    if (!id) return res.status(400).send("Faltan datos necesarios (id).");
    if (!idUser) return res.status(400).send("Faltan datos necesarios (idUser).");
    if (isNaN(parseInt(id)))
      return res
        .status(400)
        .send("Formato de datos invalido (id) debe ser un numero.");
    if (isNaN(parseInt(idUser)))
      return res
        .status(400)
        .send("Formato de datos invalido (idUser) debe ser un numero.");

    const user = await User.findByPk(idUser);
    // const user = await User.findOne({ where: { email: idUser } });
    if (!user) return res.status(400).send("El usuario no existe.");
    const product = await Product.findByPk(id);
    if (!product) return res.status(400).send("El producto no existe.");

    await user.removeFavorite(id);
    const Favorites = await user.getFavorite();
    return res.status(200).send(Favorites);
  } catch (error) {
    return res.status(400).send({ message: "Error: " + error });
  }
});

// Ruta Sacar todos los Productos de Favoritos

router.delete("/:idUser/favorite/reset", async (req, res) => {
  try {
    const { idUser } = req.params;
    if (!idUser) return res.status(400).send("Faltan datos necesarios (idUser).");    
    if (isNaN(parseInt(idUser)))
      return res
        .status(400)
        .send("Formato de datos invalido (idUser) debe ser un numero.");
    const user = await User.findByPk(idUser);
    // const user = await User.findOne({ where: { email: idUser } });
    if (!user) return res.status(400).send("El usuario no existe.");
    const Favorites = await user.getFavorite();
    Favorites.map( async (f) => {
      await user.removeFavorite(f.dataValues.id);      
    })
    return res.status(200).send("Favoritos Vaciado.");
  } catch (error) {
    return res.status(400).send({ message: "Error: " + error });
  }
});


module.exports = router;

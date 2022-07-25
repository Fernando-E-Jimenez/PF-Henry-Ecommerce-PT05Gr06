const { Review, User, Product } = require("../db");
const { Router } = require("express");
const router = Router();

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
    if (!user) return res.status(400).send("El usuario no existe.");

    const car = await user.getProducts({ joinTableAttributes: ['cant'] });
    if (!car || car.length === 0) return res.status(400).send("El Usuario no tiene productos en el carrito.");

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
    if (!user) return res.status(400).send("El usuario no existe.");
    const product = await Product.findByPk(id);
    if (!product) return res.status(400).send("El producto no existe.");

    await user.addProduct(id, { through: { cant: cant } });
    return res.status(200).send("Producto Agregado al Carrito");
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
    if (!user) return res.status(400).send("El usuario no existe.");

    products.map(async (p) => {
      await user.addProduct(p.id, { through: { cant: p.cant } });
    })

    return res.status(200).send("Productos Agregados al Carrito");
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
    if (!user) return res.status(400).send("El usuario no existe.");
    const product = await Product.findByPk(id);
    if (!product) return res.status(400).send("El producto no existe.");

    await user.removeProduct(id);
    return res.status(200).send("Producto Removido del Carrito.");
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

    const user = await User.update(
      {
        name,
        password,
        email,
        dni,
      },
      {
        where: {
          id,
        },
      }
    );
    console.log(user);
    if (user[0] === 1) {
      console.log("Aqui");
      let user1 = await User.findByPk(id);
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
    if (!user) return res.status(400).send("Usuario no encontrado");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).send({ message: "Error: " + error });
  }
});

module.exports = router;

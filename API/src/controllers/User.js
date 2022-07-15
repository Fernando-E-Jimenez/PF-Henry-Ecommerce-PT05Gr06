const { Review, Rol, User } = require("../db");
const { Router } = require('express');
const router = Router();

router.post("/:id/review", async (req, res) => {
  try {
    const { id } = req.params
    const {
      description,
      star
    } = req.body;
    if (!id)
      return res.status(400).send("Faltan datos necesarios (id).");
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
        .send("Formato de datos invalido (description) debe ser una cadena texto.");
    console.log(description, star)
    let reviewNew = await Review.create({
      description,
      star,
      productId: id
    });
    res.status(200).send(reviewNew);
  } catch (e) {
    return res.status(400).send("Error: " + e)
  }
})


router.post("/", async (req, res) => {
  try {
    const {
      user,
      password,
      email,
    } = req.body;
    console.log(req.body);
    if (!user) return res.status(400).send("Faltan datos necesarios (user).");
    if (!password) return res.status(400).send("Faltan datos necesarios (password).");
    if (!email) return res.status(400).send("Faltan datos necesarios (email).");

    let userNew = await User.create({
      user,
      password,
      email,
    });

    const roles = await Rol.findAll({
      where: { description: "User" },
    });
    userNew.addRol(roles);
    res.status(200).send(userNew);
  } catch (e) {
    return res.status(400).send("Error: " + e)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send("Faltan datos necesarios (id).");
    if (isNaN(parseInt(id)))
      return res
        .status(400)
        .send("Formato de datos invalido (id) debe ser un numero.");
    const user = await User.findByPk(id);
    user ? res.status(200).json(user) : res.status(404).send({ message: "Error: El Usuario no existe" });
  } catch (e) {
    return res.status(400).send({ message: "Error: " + e });
  }
})

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
        dni
      },
      {
        where: {
          id
        }
      }
    );
    console.log(user)
    if (user[0] === 1) {
      console.log('Aqui')
      let user1 = await User.findByPk(id);
      return res.status(200).json(user1);
    }else if (!user){
      return res.status(404).json({ message: "Error: El Usuario no Existe." });
    }else{
      return res.status(404).json({ message: "Error: Usuario no Actualizado." });
    }
  } catch (e) {
    return res.status(400).send({ message: "Error: " + e });
  }
})

module.exports = router
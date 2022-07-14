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
    res.status(400).send("Error: " + e)
  }
})


router.post("/", async (req, res) => {
  try {

    const {
      user,
      password,
      email,
    } = req.body;
    console.log(req.body)
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
    res.status(400).send("Error: " + e)
  }
})


module.exports = router
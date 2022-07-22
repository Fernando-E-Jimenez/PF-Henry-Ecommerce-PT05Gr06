const { State } = require("../db");
const axios = require("axios");
const { Router } = require("express");
const router = Router();

/* - Listar todos las Estados - */

router.get("/", async (req, res) => {
  try {
    const estados = await State.findAll();
    return res.status(200).send(estados);
  } catch (e) {
    return res.status(400).send({ message: "Error: " + e });
  }
});

/* - Registro de Estados - */

router.post("/", async (req, res, next) => {
  const { name } = req.body;
  try {
    if (!name) return res.status(400).send("Faltan datos necesarios (name).");
    const estado = await State.create({ name: name.toLowerCase() });
    return res.status(201).send(estado);
  } catch (e) {
    console.log(e)
    // if (JSON.stringify(e).includes("SequelizeUniqueConstraintError"))
    //   return res.status(400).send("Error: Ya se encuentra registrado un estado con el nombre: " + name);
    return res.status(400).send({ message: "Error: " + e });
  }
});

/* Consultar un Estado */


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send("Faltan datos necesarios (id).");
    if (isNaN(parseInt(id)))
      return res
        .status(400)
        .send("Formato de datos invalido (id) debe ser un numero.");
    const estado = await State.findByPk(id);
    if (estado) return res.status(200).send(estado);
    return res.status(200).send({ message: "Error: Estado no encontrado." });
  } catch (e) {
    return res.status(400).send({ message: "Error: " + e });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!id) return res.status(400).send("Faltan datos necesarios (id).");
    if (!name) return res.status(400).send("Faltan datos necesarios (name).");
    if (isNaN(parseInt(id)))
      return res
        .status(400)
        .send("Formato de datos invalido (id) debe ser un numero.");
    if (!isNaN(parseInt(name)))
      return res
        .status(400)
        .send("Formato de datos invalido (name) debe ser una cadena texto.");
    const estado = await State.update(
      {
        name: name.toLowerCase(),
      },
      {
        where: {
          id,
        },
      }
    );
    if (estado[0] !== 0) {
      console.log(estado);
      const est = await State.findByPk(id);
      return res.status(200).send(est);
    } else {
      return res
        .status(404)
        .send({ message: "Error: Estado no encontrada." });
    }
  } catch (e) {
    return res.status(400).send({ message: "Error: " + e });
  }
});

module.exports = router;

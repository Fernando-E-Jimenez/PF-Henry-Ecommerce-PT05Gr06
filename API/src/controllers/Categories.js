const { Category, State } = require("../db");
const axios = require("axios");
const { Router } = require("express");
const router = Router();

/* - Listar todos las Categorias - */

router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({ include: State });
    return res.status(200).send(categories);
  } catch (e) {
    res.status(400).send("Error: " + e);
  }
});

/* - Registro de Categorias - */

router.post("/", async (req, res, next) => {
  const { name } = req.body;
  try {
    if (!name) return res.status(400).send("Faltan datos necesarios (name).");
    const category = await Category.create({ name });
    res.status(201).send(category);
  } catch (e) {
    if (JSON.stringify(e).includes("SequelizeUniqueConstraintError"))
      res
        .status(400)
        .send(
          "Error: Ya se encuentra registrada una categoria con el nombre: " +
          name
        );
    res.status(400).send("Error: " + e);
  }
});

/* Eliminar Categoria */
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    if (!id) return res.status(400).send("Faltan datos necesarios (id).");
    if (isNaN(parseInt(id)))
      return res
        .status(400)
        .send("Formato de datos invalido (id) debe ser un numero.");

    const cat = await Category.findByPk(id);
    if (cat.stateId === 1) {
      const update = await Category.update(
        {
          stateId: 2,
        },
        {
          where: {
            id,
          },
        }
      );
      if (update[0] === 1) {
        return res.status(200).send("Categoria Eliminada.");
      } else {
        return res.status(400).send("Error al Elminar la Categoria.");
      }
    } else {
      const update =await Category.update(
        {
          stateId: 1,
        },
        {
          where: {
            id,
          },
        }
      );
      if (update[0] === 1) {
        return res.status(200).send("Categoria Habilitado.");
      } else {
        return res.status(400).send("Error al Habilitar la Categoria.");
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send("Faltan datos necesarios (id).");
    if (isNaN(parseInt(id)))
      return res
        .status(400)
        .send("Formato de datos invalido (id) debe ser un numero.");
    const categories = await Category.findByPk(id, { include: State });
    if (categories) return res.status(200).send(categories);
    return res.status(200).send({ message: "Error: Categoria no encontrada." });
  } catch (e) {
    res.status(400).send("Error: " + e);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, state } = req.body;
    if (!id) return res.status(400).send("Faltan datos necesarios (id).");
    if (!name) return res.status(400).send("Faltan datos necesarios (name).");
    if (!state) return res.status(400).send("Faltan datos necesarios (state).");
    if (isNaN(parseInt(id)))
      return res
        .status(400)
        .send("Formato de datos invalido (id) debe ser un numero.");
    if (!isNaN(parseInt(name)))
      return res
        .status(400)
        .send("Formato de datos invalido (name) debe ser una cadena texto.");
    if (isNaN(parseInt(state)))
      return res
        .status(400)
        .send("Formato de datos invalido (state) debe ser un numero.");
    const category = await Category.update(
      {
        name: name.toLowerCase(),
        stateId: state,
      },
      {
        where: {
          id,
        },
      }
    );
    if (category[0] !== 0) {
      console.log(category);
      const cat = await Category.findByPk(id, { include: State });
      return res.status(200).send(cat);
    } else {
      return res
        .status(404)
        .send({ message: "Error: Categoria no encontrada." });
    }
  } catch (e) {
    return res.status(400).send("Error: " + e);
  }
});

module.exports = router;

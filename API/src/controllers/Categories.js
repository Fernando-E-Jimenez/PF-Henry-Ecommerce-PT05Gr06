const { Category } = require("../db");
const axios = require("axios");
const { Router } = require("express");
const router = Router();

/* - Listar todos las Categorias - */

router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
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
    await Category.destroy({
      where: { id },
    });
    res.status(200).send("Categoria Eliminada");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

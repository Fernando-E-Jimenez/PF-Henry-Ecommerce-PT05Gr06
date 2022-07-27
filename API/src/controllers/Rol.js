const { Rol, State } = require("../db");
const { Router } = require("express");
const router = Router();

// Listar Roles

router.get("/", async (req, res) => {
  try {
    const rols = await Rol.findAll({ include: State });
    return res.status(200).send(rols);
  } catch (e) {
    return res.status(400).send({ message: "Error: " + e });
  }
});

/* - Registro de Roles - */

router.post("/", async (req, res, next) => {
  const { name, state } = req.body;
  try {
    if (!name) return res.status(400).send("Faltan datos necesarios (name).");
    if (!state) return res.status(400).send("Faltan datos necesarios (state).");
    if (!isNaN(parseInt(name)))
      return res
        .status(400)
        .send("Formato de datos invalido (name) debe ser una cadena de texto.");
    if (isNaN(parseInt(state)))
      return res
        .status(400)
        .send("Formato de datos invalido (state) debe ser un numero.");

    const rol = await Rol.create({ name: name.toLowerCase(), stateId: state });
    return res.status(201).send(rol);
  } catch (e) {
    console.log(e)
    if (JSON.stringify(e).includes("SequelizeUniqueConstraintError"))
      return res.status(400).send("Error: Ya se encuentra registrado un rol con el nombre: " + name);
    return res.status(400).send({ message: "Error: " + e });
  }
});

/* Consultar un Rol */

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send("Faltan datos necesarios (id).");
    if (isNaN(parseInt(id)))
      return res
        .status(400)
        .send("Formato de datos invalido (id) debe ser un numero.");
    const rol = await Rol.findByPk(id, { include: State });
    if (rol) return res.status(200).send(rol);
    return res.status(200).send({ message: "Error: Rol no encontrado." });
  } catch (e) {
    return res.status(400).send({ message: "Error: " + e });
  }
});

/* Actualizar un Rol */

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
    const rol = await Rol.update(
      {
        name: name.toLowerCase(),
        stateId: state
      },
      {
        where: {
          id,
        },
      }
    );
    if (rol[0] !== 0) {
      console.log(rol);
      const ro = await Rol.findByPk(id);
      return res.status(200).send(ro);
    } else {
      return res
        .status(404)
        .send({ message: "Error: Estado no encontrada." });
    }
  } catch (e) {
    return res.status(400).send({ message: "Error: " + e });
  }
});


/* Eliminar Rol */


router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    if (!id) return res.status(400).send("Faltan datos necesarios (id).");
    if (isNaN(parseInt(id)))
      return res
        .status(400)
        .send("Formato de datos invalido (id) debe ser un numero.");

    const rol = await Rol.findByPk(id);
    if (rol.stateId === 1) {
      const update = await Rol.update(
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
        return res.status(200).send("Rol Eliminado.");
      } else {
        return res.status(400).send("Error al Elminar el Rol.");
      }
    } else {
      const update =await Rol.update(
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
        return res.status(200).send("Rol Habilitado.");
      } else {
        return res.status(400).send("Error al Habilitar el Rol.");
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

const { User, State, Rol } = require("../db");
const { transporter } = require("../utils/nodeMailer");
const { Router } = require("express");
const { MAILUSER } = process.env;
const router = Router();

const userBD = async () => {
  try {
    return await User.findAll({
      include: [
        {
          model: State
        },
        {
          model: Rol
        }
      ]
    });
  } catch (e) {
    return e;
  }
};

// Ruta para Consultar los Usuarios Registrados

router.get("/", async (req, res) => {
  try {
    const all = await userBD();
    res.status(200).send(all);
  } catch (e) {
    return res.status(400).send({ message: "Error: " + e });
  }
});


// Ruta para consultar los datos de un Usuario en especifico

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send("Faltan datos necesarios (id).");
    if (isNaN(parseInt(id)))
      return res
        .status(400)
        .send("Formato de datos invalido (id) debe ser un numero.");
    const user = await User.findByPk(id, {
      include: [
        {
          model: State
        },
        {
          model: Rol
        }
      ]
    });
    if (!user) return res.status(400).send("Usuario no encontrado");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).send({ message: "Error: " + error });
  }
});

// Ruta del Admin para Crear usuarios 

router.post("/", async (req, res) => {
  try {
    const { username, password, email, name, dni, rol, state } = req.body;
    if (!username) return res.status(400).send("Faltan datos necesarios (username).");
    if (!password)
      return res.status(400).send("Faltan datos necesarios (password).");
    if (!email) return res.status(400).send("Faltan datos necesarios (email).");
    if (!name) return res.status(400).send("Faltan datos necesarios (name).");
    if (!dni) return res.status(400).send("Faltan datos necesarios (dni).");
    if (!rol) return res.status(400).send("Faltan datos necesarios (rol).");
    if (!state) return res.status(400).send("Faltan datos necesarios (state).");
    if (isNaN(parseInt(state)))
      return res
        .status(400)
        .send("Formato de datos invalido (state) debe ser un numero.");
    if (isNaN(parseInt(rol)))
      return res
        .status(400)
        .send("Formato de datos invalido (rol) debe ser un numero.");
    if (isNaN(parseInt(dni)))
      return res
        .status(400)
        .send("Formato de datos invalido (dni) debe ser un numero.");
    if (!isNaN(parseInt(name)))
      return res
        .status(400)
        .send(
          "Formato de datos invalido (name) debe ser una cadena texto."
        );
    if (!isNaN(parseInt(email)))
      return res
        .status(400)
        .send(
          "Formato de datos invalido (email) debe ser una cadena texto."
        );
    const userNew = await User.create({
      username,
      password,
      email,
      name,
      dni,
      stateId: state,
      rolId: rol
    });
    return res.status(201).json(userNew);
  } catch (e) {
    return res.status(400).send("Error: " + e);
  }
});


// Ruta para Actualizar los datos de un Usuario

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, email, name, dni, rol, state } = req.body;
    if (!id) return res.status(400).send("Faltan datos necesarios (id).");
    if (!username) return res.status(400).send("Faltan datos necesarios (username).");
    if (!password)
      return res.status(400).send("Faltan datos necesarios (password).");
    if (!email) return res.status(400).send("Faltan datos necesarios (email).");
    if (!name) return res.status(400).send("Faltan datos necesarios (name).");
    if (!dni) return res.status(400).send("Faltan datos necesarios (dni).");
    if (!rol) return res.status(400).send("Faltan datos necesarios (rol).");
    if (!state) return res.status(400).send("Faltan datos necesarios (state).");
    if (isNaN(parseInt(id)))
      return res
        .status(400)
        .send("Formato de datos invalido (id) debe ser un numero.");
    if (isNaN(parseInt(state)))
      return res
        .status(400)
        .send("Formato de datos invalido (state) debe ser un numero.");
    if (isNaN(parseInt(rol)))
      return res
        .status(400)
        .send("Formato de datos invalido (rol) debe ser un numero.");
    if (isNaN(parseInt(dni)))
      return res
        .status(400)
        .send("Formato de datos invalido (dni) debe ser un numero.");
    if (!isNaN(parseInt(name)))
      return res
        .status(400)
        .send(
          "Formato de datos invalido (name) debe ser una cadena texto."
        );
    if (!isNaN(parseInt(email)))
      return res
        .status(400)
        .send(
          "Formato de datos invalido (email) debe ser una cadena texto."
        );

    const user = await User.update(
      {
        username,
        password,
        email,
        name,
        dni,
        stateId: state,
        rolId: rol
      },
      {
        where: {
          id,
        },
      }
    );
    console.log(user);
    if (user[0] === 1) {
      let user1 = await User.findByPk(id, {
        include: [
          {
            model: State
          },
          {
            model: Rol
          }
        ]
      });
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


// Ruta para Eliminar y Habilitar un Usuario


router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).send("Faltan datos necesarios (id).");
    if (isNaN(parseInt(id)))
      return res
        .status(400)
        .send("Formato de datos invalido (id) debe ser un numero.");

    const user = await User.findByPk(parseInt(id));
    if (!user) return res.status(400).send("Error Usuario no encontrado.");

    if (user.stateId === 1) {
      const user1 = await User.update(
        { stateId: 2 },
        {
          where: {
            id: id,
          },
        }
      );
      if (user1[0] === 1) {
        return res.status(200).json("Usuario Eliminado.");
      } else {
        return res.status(400).send("Error al Eliminar al Usuario.");
      }
    } else {
      const user1 = await User.update(
        { stateId: 1 },
        {
          where: {
            id: id,
          },
        }
      );
      if (user1[0] === 1) {
        return res.status(200).json("Usuario Habilitado.");
      } else {
        return res.status(400).send("Error al Habilitar al Usuario.");
      }
    }

  } catch (error) {
    return res.status(400).send("Error: " + error);
  }
});


// Ruta para Enviar Correos

router.post("/mail", async (req, res, next) => {
  try {
    const { asunto, texto, destinatario } = req.body;

    if (!asunto) return res.status(400).send("Faltan datos necesarios (asunto).");
    if (!texto) return res.status(400).send("Faltan datos necesarios (texto).");
    if (!destinatario) return res.status(400).send("Faltan datos necesarios (destinatario).");
    if (!isNaN(parseInt(asunto)))
      return res
        .status(400)
        .send("Formato de datos invalido (asunto) debe ser una cadena de texto.");
    if (!isNaN(parseInt(texto)))
      return res
        .status(400)
        .send("Formato de datos invalido (texto) debe ser una cadena de texto.");

    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (!emailRegex.test(destinatario))
      return res
        .status(400)
        .send("Formato de datos invalido (destinatario) debe ser una direccion de correo electronico.");

    // send mail with defined transport object
    await transporter.sendMail({
      from: '"App Vinos" <' + MAILUSER + '>', // sender address
      to: destinatario, // list of receivers
      subject: asunto, // Subject line
      text: texto, // plain text body
      // html: "<b>Hello world?</b>", // html body
    });
    return res.status(200).send('Email Enviado.');
  } catch (error) {
    return res.status(400).send({ message: "Error: " + error });
  }
});


module.exports = router;

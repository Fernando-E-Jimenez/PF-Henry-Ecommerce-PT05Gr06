const { Product, Order, Review, State, User } = require("../db");
const { transporter } = require("../utils/nodeMailer");
const { MAILUSER } = process.env;
const { Router } = require("express");
const { Op } = require("sequelize");
const router = Router();


// Admin ...poder ver una lista de todas las ordenes, para poder ver y revisar las ordenes.
router.get("/", async (req, res) => {
  try {
    const { state, user } = req.query;
    let options = {
      include: [
        {
          model: User
        },
        {
          model: State
        },
        {
          model: Product,
          through: {
            attributes: ['cant']
          }
        }
      ]
    }
    if (state) {
      if (isNaN(parseInt(state)))
        return res
          .status(400)
          .json({
            message: "Formato de datos invalido (state) debe ser un numero.",
          });
      options.include[1].where = { id: state };
    }
    if (user) {
      if (!isNaN(parseInt(user)))
        return res
          .status(400)
          .json({
            message: "Formato de datos invalido (user) debe ser una cadena texto.",
          });
      options.include[0].where = {
        name: {
          [Op.like]: `%${user.toLowerCase()}%`,
        }
      };
      console.log(options.include[0]);
    }
    const total = await Order.findAll(options);
    // if (total.length === 0) return res.status(200).send("No se encontraron Ordenes.");
    return res.status(200).send(total);
  } catch (e) {
    return res.status(400).send("Error: " + e);
  }
});

// Admin ... ver los detalles de una orden específica,
// asi puedo revisarla y actualizar su estado

router.get("/:idOrder", async (req, res) => {
  try {
    const { idOrder } = req.params;
    if (!idOrder) return res.status(400).send("Faltan datos necesarios (idOrder).");
    if (isNaN(parseInt(idOrder)))
      return res
        .status(400)
        .send("Formato de datos invalido (idOrder) debe ser un numero.");
    const order = await Order.findByPk(idOrder, {
      include: [
        {
          model: User
        },
        {
          model: State
        },
        {
          model: Product,
          through: {
            attributes: ['cant']
          }
        }
      ]
    });
    return res.status(200).send(order);
  } catch (e) {
    return res.status(400).send("Error: " + e);
  }
});


// Admin ... Actualizar el estado de una orden

router.put("/:idOrder", async (req, res) => {
  try {
    const { idOrder } = req.params;
    const { state } = req.body;
    if (!idOrder) return res.status(400).send("Faltan datos necesarios (idOrder).");
    if (isNaN(parseInt(idOrder)))
      return res
        .status(400)
        .send("Formato de datos invalido (idOrder) debe ser un numero.");
    if (!state) return res.status(400).send("Faltan datos necesarios (state).");
    if (isNaN(parseInt(state)))
      return res
        .status(400)
        .send("Formato de datos invalido (state) debe ser un numero.");
    const order = await Order.findByPk(idOrder, { include: User });
    const stateData = await State.findByPk(state);
    if (!order) return res.status(200).send("No se encontro la orden.");
    const update = await Order.update(
      {
        stateId: state
      },
      {
        where: {
          id: idOrder
        }
      }
    )
    if (update[0] === 1) {
      await transporter.sendMail({
        from: '"App Vinos" <' + MAILUSER + '>', // sender address
        to: order.dataValues.user.email, // list of receivers
        subject: "Estado de Orden de Compra Actualizado.", // Subject line
        text: "AppVinos le informa que el estado de su orden de compra no. " + idOrder + " ha sido actualizado a: " + stateData.dataValues.name, // plain text body
        // html: "<b>Hello world?</b>", // html body
      });
      const order2 = await Order.findByPk(idOrder, {
        include: [
          {
            model: User
          },
          {
            model: State
          },
          {
            model: Product,
            through: {
              attributes: ['cant']
            }
          }
        ]
      });
      return res.status(200).send(order2);
    } else {
      return res.status(400).send("Error al actualizar Orden.");
    }
  } catch (e) {
    return res.status(400).send("Error: " + e);
  }
});

// Admin ... Actualizar el Stock de los productos de una orden

router.post("/:idOrder/removestock", async (req, res) => {
  try {
    const { idOrder } = req.params;
    if (!idOrder) return res.status(400).send("Faltan datos necesarios (idOrder).");
    if (isNaN(parseInt(idOrder)))
      return res
        .status(400)
        .send("Formato de datos invalido (idOrder) debe ser un numero.");

    const order = await Order.findByPk(idOrder, {
      include: [
        {
          model: Product,
          through: {
            attributes: ['cant']
          }
        }
      ]
    });
    if (!order) return res.status(200).send("No se encontro la orden.");
    await order.dataValues.products.map(async (p) => {
      const { id, stock } = p.dataValues;
      const { cant } = p.dataValues.productXorder.dataValues;
      const total = stock - cant;
      // console.log("Id: " + id + " stock: " + stock + " cant: " + cant + " total: " + total);
      try {
        await Product.update(
          {
            stock: total
          },
          {
            where: {
              id: id
            }
          }
        )
      } catch (error) {
        return res.status(400).send({ message: "Error: " + error });
      }
    })
    // console.log(order)
    return res.status(200).send("Stock Actualizado");
  } catch (e) {
    return res.status(400).send({ message: "Error: " + e });
  }
});






module.exports = router;

const { Product, Order, Review, State, User } = require("../db");
const { Router } = require("express");
const router = Router();


// Admin ...poder ver una lista de todas las ordenes, para poder ver y revisar las ordenes.
router.get("/", async (req, res) => {
  try {
    const { state } = req.query;
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
      options.include[1].where = { id : state};
    }
    const total = await Order.findAll(options);
    if(total.length === 0) return res.status(200).send("No se encontraron Ordenes.");
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
    const order = await Order.findByPk(idOrder);
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
      return res.status(200).send("Orden Actualizada.");
    }else{
      return res.status(400).send("Error al actualizar Orden.");
    }
  } catch (e) {
    return res.status(400).send("Error: " + e);
  }
});

module.exports = router;

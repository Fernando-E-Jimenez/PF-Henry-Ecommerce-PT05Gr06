const { Product, Order, Review } = require("../db");
const { Router } = require("express");
const router = Router();

const orderDB = async () => {
  try {
    return await Order.findAll({
      include: {
        model: Product,
        attributes: [
          "id",
          "name",
          "description",
          "stock",
          "price",
          "image",
          "state",
        ],
        through: {
          attributes: ["cant"],
        },
      },
    });
  } catch (e) {
    return e;
  }
};

// Admin ...poder ver una lista de todas las ordenes, para poder ver y revisar las ordenes.
router.get("/", async (req, res) => {
  try {
    const total = await orderDB();
    res.status(200).send(total);
  } catch (e) {
    res.status(400).send("Error: " + e);
  }
});

// Admin ... ver los detalles de una orden específica,
// asi puedo revisarla y actualizar su estado

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const all = await orderDB();
      const productNew = all.filter((e) => e.id == id);
      let categoryNew = productNew[0].categories.map((e) => {
        return e.dataValues.name;
      });
      const reviewNew = r.filter((f) => f.productId == id);
      var resultado = {
        id: productNew[0].id,
        cant: productNew[0].cant,
        // price: productNew[0].price,
        // stock: productNew[0].stock,
        // image: productNew[0].image,
        // review: reviewNew,
        // category: categoryNew
      };
    }
    res.status(200).send(resultado);
  } catch (e) {
    res.status(400).send("Error: " + e);
  }
});
module.exports = router;

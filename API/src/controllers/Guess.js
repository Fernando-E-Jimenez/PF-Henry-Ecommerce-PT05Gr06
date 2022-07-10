const { Product, Category, Review } = require("../db");
const { Router } = require('express');
const router = Router();

const DB = async () => {
  try {
    return await Product.findAll({
      include: {
        model: Category,
        attributes: ['name'],
        through: {
          attributes: []
        }
      }
    })
  } catch (e) {
    return e
  }

}

const Revie = async () => {
    try {
      return await Review.findAll()
    } catch (e) {
      return e
    }
  
  }
/*..ver la lista completa de productos (catálogo), para ver todo lo disponible para 
comprar.

   Y 
   
...buscar productos, para poder encontrar rápido los que quiero comprar. */

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const total = await DB();
    if (name) {
      const nameProduct = total.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
      console.log(nameProduct)
      nameProduct.length ? res.status(200).send(nameProduct) : res.status(400).send("El vino descrito no se encuentra guardado");
    } else {
      res.status(200).send(total);
    }
  } catch (e) {
    res.status(400).send("Error: " + e)
  }
})

/*...ver los detalles de un producto individual (incluida las fotos, descripciones, 
reviews, etc...), asi puede determinar si quiero ese producto o no.  */

router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      if (id) {
        const all = await DB();
        const r = await Revie();
        const productNew = all.filter((e) => e.id == id)
        let categoryNew = productNew[0].categories.map((e) => { return e.dataValues.name })
        const reviewNew = r.filter((f) => f.productId == id)
        var resultado = {
          name: productNew[0].name,
          description: productNew[0].description,
          price: productNew[0].price,
          stock: productNew[0].stock,
          image: productNew[0].image,
          review: reviewNew,
          category: categoryNew
        }
      }
      res.status(200).send(resultado);
    }
    catch (e) {
      res.status(400).send("Error: " + e)
    }
  });

module.exports = router
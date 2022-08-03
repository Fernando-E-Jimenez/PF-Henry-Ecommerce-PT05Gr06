const { Product, Category, Review, State } = require("../db");
const { Router } = require("express");
const { Op } = require("sequelize");
const paginate = require("./Paginate");
const router = Router();

const DB = async () => {
  try {
    return await Product.findAll({
      include: [{
        model: Category,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: State
      }],
    });
  } catch (e) {
    return e;
  }
};

const Revie = async () => {
  try {
    return await Review.findAll();
  } catch (e) {
    return e;
  }
};

const getCategory = async (id) => {
  try {
    let prod = await Product.findByPk(id);
    const cat = await prod.getCategories();
    prod = {
      ...prod.dataValues,
      categories: cat.map((c) => {
        return { name: c.name };
      }),
    };
    return prod;
  } catch (e) {
    return e;
  }
};

router.get("/autocomplete", async (req, res) => {
  try {
    console.log("Aqui")
    const products = await Product.findAll({
      where: {
        stateId: 1,
        stock: {
          [Op.gt]: 0
        }
      },
      attributes: ["name"]
    })
    
    return res.status(200).json(products);
  } catch (e) {
    return res.status(400).send({ message: "Error: " + e });
  }
});

/*..ver la lista completa de productos (catálogo), para ver todo lo disponible para 
comprar.

   Y 
   
...buscar productos, para poder encontrar rápido los que quiero comprar. */

router.get("/", async (req, res) => {
  try {
    const { name, page, order_direction, order_by, category, page_limit } =
      req.query;
    let search = {
      where: {
        stateId: 1,
        stock: {
          [Op.gt]: 0
        }
      }
    };
    let order = [];
    let filter = {};
    if (name) {
      if (!isNaN(parseInt(name)))
        return res
          .status(400)
          .json({
            message:
              "Formato de datos invalido (name) debe ser una cadena texto.",
          });
      search = {
        ...search,
        where: {
          ...search.where,
          name: {
            [Op.like]: `%${name.toLowerCase()}%`,
          },
        },
      };
    }
    if (category) {
      if (isNaN(parseInt(category)))
        return res
          .status(400)
          .json({
            message: "Formato de datos invalido (category) debe ser un numero.",
          });
      filter = category;
    }
    if (order_direction) {
      if (order_direction === "DESC" || order_direction === "ASC") {
        order.push([["name", order_direction]]);
        if (order_by) {
          if (order_by.toLowerCase() === "price") {
            order.pop();
            order.push([["price", order_direction]]);
          }
        }
      } else {
        return res
          .status(400)
          .json({
            message:
              "Datos invalidos (order_direction) permitidos: DESC o ASC.",
          });
      }
    }

    let data = await paginate(Product, page, page_limit, search, order, filter);
    if (category) {
      let data2 = [];
      await Promise.all(
        data.data.map(async (p) => {
          data2.push(await getCategory(p.id));
        })
      );
      data = { ...data, data: data2 };
    }

    data.data.length
      ? res.status(200).json(data)
      : res
        .status(400)
        .send({ message: "El vino descrito no se encuentra guardado" });
  } catch (e) {
    res.status(400).send({ message: "Error: " + e });
  }
});

/*...ver los detalles de un producto individual (incluida las fotos, descripciones, 
reviews, etc...), asi puede determinar si quiero ese producto o no.  */

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const all = await DB();
      const r = await Revie();
      const productNew = all.filter((e) => e.id == id);
      let categoryNew = productNew[0].categories.map((e) => {
        return e.dataValues.name;
      });
      const reviewNew = r.filter((f) => f.productId == id);
      var resultado = {
        id: id,
        name: productNew[0].name,
        description: productNew[0].description,
        price: productNew[0].price,
        stock: productNew[0].stock,
        image: productNew[0].image,
        state: productNew[0].state,
        review: reviewNew,
        category: categoryNew,
      };
    }
    res.status(200).send(resultado);
  } catch (e) {
    res.status(400).send({ message: "Error: " + e });
  }
});



module.exports = router;

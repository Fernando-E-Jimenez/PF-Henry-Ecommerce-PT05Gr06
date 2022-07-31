const { Product, Category, Review, Order, State, Rol } = require("../db");
const { upload, cloudinary } = require("../libs/storage");
const { arrayProductos, arraycategorias, arrayReviews, arrayStates, arrayRols } = require("./Data");

const { Router } = require("express");
const paginate = require("./Paginate");
const { Op } = require("sequelize");
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

router.post("/", upload.array("image"), async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, description, price, stock, category, state } = req.body;
    const image = req.files || req.file;
    if (!name) return res.status(400).send("Faltan datos necesarios (name).");
    if (!description)
      return res.status(400).send("Faltan datos necesarios (description).");
    if (!price) return res.status(400).send("Faltan datos necesarios (price).");
    if (!stock) return res.status(400).send("Faltan datos necesarios (stock).");
    if (!category)
      return res.status(400).send("Faltan datos necesarios (category).");
    if (isNaN(parseInt(stock)))
      return res
        .status(400)
        .send("Formato de datos invalido (stock) debe ser un numero.");
    if (isNaN(parseInt(price)))
      return res
        .status(400)
        .send("Formato de datos invalido (price) debe ser un numero.");
    if (!isNaN(parseInt(name)))
      return res
        .status(400)
        .send("Formato de datos invalido (name) debe ser una cadena texto.");
    if (!isNaN(parseInt(description)))
      return res
        .status(400)
        .send(
          "Formato de datos invalido (description) debe ser una cadena de texto."
        );
    if (state) {
      if (isNaN(parseInt(state)))
        return res
          .status(400)
          .send("Formato de datos invalido (state) debe ser un numero.");
    }

    console.log(image);

    let imagenes = image ? image.map((i) => i.path) : undefined;
    let product = await Product.create({
      name: name.toLowerCase(),
      description: description,
      price: price,
      stock: stock,
      stateId: state ? state : 1,
      image: imagenes
        ? imagenes
        : [
          "https://res.cloudinary.com/jdmoreno/image/upload/v1658524620/DefaulImage/Default_Vino_dpapbj.png",
        ],
    });

    if (typeof category === "string") {
      const cat = category.split(",");
      await Promise.all(
        cat.map(async (c) => {
          await product.addCategories(c);
        })
      );
    } else {
      await Promise.all(
        category.map(async (c) => {
          await product.addCategories(c);
        })
      );
    }


    const catego = await product.getCategories();

    return res.status(201).json({ ...product.dataValues, category: catego });
  } catch (e) {
    return res.status(400).send("Error: " + e);
  }
});

router.put("/", upload.array("image"), async (req, res, next) => {
  try {
    const image = req.files || req.file;
    const { id, name, description, price, stock, category, state } = req.body;

    if (!id) return res.status(400).send("Faltan datos necesarios (id).");
    if (!name) return res.status(400).send("Faltan datos necesarios (name).");
    if (!description)
      return res.status(400).send("Faltan datos necesarios (description).");
    if (!price) return res.status(400).send("Faltan datos necesarios (price).");
    if (!stock) return res.status(400).send("Faltan datos necesarios (stock).");
    if (!state) return res.status(400).send("Faltan datos necesarios (state).");
    if (!category)
      return res.status(400).send("Faltan datos necesarios (category).");
    if (isNaN(parseInt(id)))
      return res
        .status(400)
        .send("Formato de datos invalido (id) debe ser un numero.");
    if (isNaN(parseInt(stock)))
      return res
        .status(400)
        .send("Formato de datos invalido (stock) debe ser un numero.");
    if (isNaN(parseInt(price)))
      return res
        .status(400)
        .send("Formato de datos invalido (price) debe ser un numero.");
    if (!isNaN(parseInt(name)))
      return res
        .status(400)
        .send("Formato de datos invalido (name) debe ser una cadena texto.");
    if (isNaN(parseInt(state)))
      return res
        .status(400)
        .send("Formato de datos invalido (state) debe ser un numero.");
    if (!isNaN(parseInt(description)))
      return res
        .status(400)
        .send(
          "Formato de datos invalido (description) debe ser una cadena de texto."
        );

    const prod = await Product.findByPk(parseInt(id));
    if (!prod) return res.status(400).send("Error producto no encontrado.");
    if (typeof category === "string") {
      const cat = category.split(",");
      prod.removeCategories(cat);
      prod.setCategories(cat);
    } else {
      prod.removeCategories(category);
      prod.setCategories(category);
    }
    console.log(state);
    if (image) {
      let imagenes = image.map((i) => i.path);
      prod.image.map(async (i) => {
        if (i.includes("AppVinos")) {
          let m = i.split("/")[8].split(".")[0];
          console.log(m);
          await cloudinary.api.delete_resources(
            "AppVinos/" + m,
            function (error, result) {
              console.log(result, error);
            }
          );
        }
      });
      const product = await Product.update(
        { name: name.toLowerCase(), description, price, stock, image: imagenes, stateId: state },
        {
          where: {
            id: id,
          },
        }
      );
      const produ = await Product.findByPk(id, { include: State });
      const cat = await produ.getCategories();
      if (product[0] === 1)
        return res.status(200).json({ ...produ.dataValues, categories: cat });
      return res.status(400).send("Error al actualizar el producto.");
    } else {
      const product = await Product.update(
        { name: name.toLowerCase(), description, price, stock, stateId: state },
        {
          where: {
            id: id,
          },
        }
      );
      const prod = await Product.findByPk(id, { include: State });
      const cat = await prod.getCategories();
      if (product[0] === 1)
        return res.status(200).json({ ...prod.dataValues, categories: cat });
      return res.status(400).send("Error al actualizar el producto.");
    }
  } catch (error) {
    return res.status(400).send("Error: " + error);
  }
});


// Ruta para Eliminar y Habilitar un Producto


router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).send("Faltan datos necesarios (id).");
    if (isNaN(parseInt(id)))
      return res
        .status(400)
        .send("Formato de datos invalido (id) debe ser un numero.");

    const prod = await Product.findByPk(parseInt(id));
    if (!prod) return res.status(400).send("Error producto no encontrado.");

    if (prod.stateId === 1) {
      const product = await Product.update(
        { stateId: 2 },
        {
          where: {
            id: id,
          },
        }
      );
      if (product[0] === 1) {
        return res.status(200).json("Producto Eliminado.");
      } else {
        return res.status(400).send("Error al Eliminar el producto.");
      }
    } else {
      const product = await Product.update(
        { stateId: 1 },
        {
          where: {
            id: id,
          },
        }
      );
      if (product[0] === 1) {
        return res.status(200).json("Producto Habilitado.");
      } else {
        return res.status(400).send("Error al Habilitar el producto.");
      }
    }

  } catch (error) {
    return res.status(400).send("Error: " + error);
  }
});


router.get("/carga", async (req, res, next) => {
  const { id } = req.params;
  if (id) return next();
  try {
    const ejecutar = async (promesa) => {
      await promesa;
    }
    // const ejecutar2 = async (array) => {
    //   await Promise.all(array.map(async s => {
    //     await State.findOrCreate({
    //       where: { name: s.name.toLowerCase() },
    //     })
    //   }));
    // }

    // await arrayStates.map(async (s) => {
    //   await ejecutar(
    //     await State.findOrCreate({
    //       where: { name: s.name.toLowerCase() },
    //     })
    //   )
    // })

    await State.findOrCreate({
      where: { name: "activo" },
    })
    await State.findOrCreate({
      where: { name: "inactivo" },
    })
    await State.findOrCreate({
      where: { name: "creada" },
    })
    await State.findOrCreate({
      where: { name: "procesando" },
    })
    await State.findOrCreate({
      where: { name: "cancelada" },
    })
    await State.findOrCreate({
      where: { name: "completa" },
    })
    await arrayRols.map(async (r) => {
      await ejecutar(
        await Rol.findOrCreate({
          where: { name: r.name.toLowerCase(), stateId: 1 },
        })
      )
    })
    await arraycategorias.map(async (c) => {
      await ejecutar(
        Category.findOrCreate({
          where: { name: c.name.toLowerCase(), stateId: 1 },
        })
      )
    })

    await Promise.all(
      arrayProductos.map(async (p) => {
        const product = await Product.findOrCreate({
          where: {
            name: p.name.toLowerCase(),
            image: p.image,
            description: p.description,
            price: p.price,
            stock: p.stock,
            image: [p.image],
            stateId: 1
          },
        });
        const prod = await Product.findByPk(product[0].dataValues.id);
        await prod.setCategories(p.category);
      })
    );
    Promise.all(
      arrayReviews.map(async (r) => {
        await Review.findOrCreate({
          where: {
            description: r.description,
            star: r.star,
            productId: r.productId,
            stateId: 1
          },
        });
      })
    );
    return res.status(200).send("Productos Cargados.");
  } catch (error) {
    return res.status(400).send("Error: " + error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const all = await DB();
      if (!all.length)
        return res
          .status(400)
          .send({ message: "Error: No hay productos Cargados" });
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

router.get("/", async (req, res) => {
  try {
    const { name, page, order_direction, order_by, category, page_limit } =
      req.query;
    let search = {};
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
        where: {
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

module.exports = router;

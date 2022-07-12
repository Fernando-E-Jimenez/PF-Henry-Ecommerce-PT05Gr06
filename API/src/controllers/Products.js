const { Product, Category, Review, Order } = require("../db");
const { upload, cloudinary } = require('../libs/storage');
const { arrayProductos, arraycategorias } = require('./Data');

const { Router } = require('express');
const router = Router();


router.post('/', upload.array('image'), async (req, res, next) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const image = req.files || req.file;
    if (!name) return res.status(400).send("Faltan datos necesarios (name).");
    if (!description) return res.status(400).send("Faltan datos necesarios (description).");
    if (!price) return res.status(400).send("Faltan datos necesarios (price).");
    if (!stock) return res.status(400).send("Faltan datos necesarios (stock).");
    if (!category) return res.status(400).send("Faltan datos necesarios (category).");
    if (isNaN(parseInt(stock))) return res.status(400).send("Formato de datos invalido (stock) debe ser un numero.");
    if (isNaN(parseInt(price))) return res.status(400).send("Formato de datos invalido (price) debe ser un numero.");
    if (!isNaN(parseInt(name))) return res.status(400).send("Formato de datos invalido (name) debe ser una cadena texto.");
    if (!isNaN(parseInt(description))) return res.status(400).send("Formato de datos invalido (description) debe ser una cadena de texto.");

    let imagenes = image.map(i => i.path);
    let product = await Product.create({
      name,
      description,
      price,
      stock,
      image: imagenes ? imagenes : ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj69dz8tM7tixlt4hTLPnGwVPavHB1QYeGtA&usqp=CAU"],
    });

    // const cat = category.split(",");
    await Promise.all(category.map(async c => {
      await product.addCategories(c);
    }));

    const catego = await product.getCategories();

    return res.status(201).json({ ...product.dataValues, category: catego });
  }
  catch (e) {
    return res.status(400).send("Error: " + e);
  }
});




router.put('/', upload.array('image'), async (req, res, next) => {
  try {
    const image = req.files || req.file;
    const { id, name, description, price, stock, category } = req.body;

    // if (!image) return res.status(400).send("Faltan datos necesarios (image).");
    if (!id) return res.status(400).send("Faltan datos necesarios (id).");
    if (!name) return res.status(400).send("Faltan datos necesarios (name).");
    if (!description) return res.status(400).send("Faltan datos necesarios (description).");
    if (!price) return res.status(400).send("Faltan datos necesarios (price).");
    if (!stock) return res.status(400).send("Faltan datos necesarios (stock).");
    if (!category) return res.status(400).send("Faltan datos necesarios (category).");
    if (isNaN(parseInt(id))) return res.status(400).send("Formato de datos invalido (id) debe ser un numero.");
    if (isNaN(parseInt(stock))) return res.status(400).send("Formato de datos invalido (stock) debe ser un numero.");
    if (isNaN(parseInt(price))) return res.status(400).send("Formato de datos invalido (price) debe ser un numero.");
    if (!isNaN(parseInt(name))) return res.status(400).send("Formato de datos invalido (name) debe ser una cadena texto.");
    if (!isNaN(parseInt(description))) return res.status(400).send("Formato de datos invalido (description) debe ser una cadena de texto.");

    let imagenes = image.map(i => i.path);
    const prod = await Product.findByPk(parseInt(id));
    await prod.setCategories(category);
    prod.image.map(async i => {
      let m = i.split('/')[8].split('.')[0];
      console.log(m);
      await cloudinary.api.delete_resources('AppVinos/' + m, function (error, result) {
        console.log(result, error)
      });
    });
    const product = await Product.update(
      { name, description, price, stock, image: imagenes },
      {
        where: {
          id: id
        }
      }
    );
    if (product) return res.status(200).send('Producto actualizado.');
    return res.status(400).send('Error al actualizar el producto.');
  } catch (error) {
    return res.status(400).send("Error: " + error);
  }
});


router.get("/carga", async (req, res) => {
  try {
    Promise.all(arraycategorias.map(async (c) => {
      // console.log(c)
      await Category.findOrCreate({
        where: { name: c.name }
      })
    }))
    Promise.all(arrayProductos.map(async p => {
      const product = await Product.findOrCreate({
        where: {
          name: p.name.toLowerCase(),
          image: p.image,
          description: p.description,
          price: p.price,
          stock: p.stock,
          image: [p.image]
        }
      })
      const prod = await Product.findByPk(product[0].dataValues.id);
      await prod.setCategories(p.category);
    }))
    return res.status(200).send('Productos Cargados.');
  } catch (error) {
    return res.status(400).send("Error: " + error);
  }
});



module.exports = router
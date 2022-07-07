const { Product, Category } = require("../db");
const axios = require('axios')
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
 /*..ver la lista completa de productos (catálogo), para ver todo lo disponible para 
comprar.
    Y 
    
...buscar productos, para poder encontrar rápido los que quiero comprar. */

router.get("/", async (req, res) => {
    const { name } = req.query;
    const total = await DB();
    if (name) {
        const nameProduct = total.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
        console.log(nameProduct)
        nameProduct.length ? res.status(200).send(nameProduct) : res.status(400).send("El vino descrito no se encuentra guardado");
    } else {
        res.status(200).send(total);
    }
})

router.post('/', async (req, res, next) => {
    try{
        const {
        name,
        description,
        price,
        stock,
        image,
    } = req.body;

    let dog = await Product.create({
        name,
        description,
        price,
        stock,
        image: image ? image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj69dz8tM7tixlt4hTLPnGwVPavHB1QYeGtA&usqp=CAU",
    });


    res.status(200).send(dog);
}
catch (e) {
    res.status(400).send("***Error***")
}
    
});

module.exports = router
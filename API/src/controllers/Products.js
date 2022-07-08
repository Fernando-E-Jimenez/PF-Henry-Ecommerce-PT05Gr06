const { Product, Category, Review, Order } = require("../db");
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
    try{
    const { name } = req.query;
    const total = await DB();
    if (name) {
        const nameProduct = total.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
        console.log(nameProduct)
        nameProduct.length ? res.status(200).send(nameProduct) : res.status(400).send("El vino descrito no se encuentra guardado");
    } else {
        res.status(200).send(total);
    }
    }catch (e) {
        res.status(400).send("***Error***")
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
        res.status(400).send("***Error***")
    }
});

router.post("/:id/review", async (req, res) => {
    try{
        const {id} = req.params
        const {
            description,
            star
        } = req.body;
        console.log(description,star)
        let reviewNew = await Review.create({
            description,
            star,
            productId: id
        });


        res.status(200).send(reviewNew);
    }catch (e) {
    res.status(400).send("***Error***")
}
})

/*..poder agregar items a mi carrito de compras desde el listado o desde a página de 
detalles de un producto, para poder comprarlos despues.  - Guest */

router.post("/:id/order", async (req, res) => {
    try{
        const {id} = req.params
        const {
            state, 
            address
        } = req.body;
        let orderNew = await Order.create({
            state,
            address
        });
        res.status(200).send(orderNew);
    }catch (e) {
    res.status(400).send("***Error***")
}
})

module.exports = router
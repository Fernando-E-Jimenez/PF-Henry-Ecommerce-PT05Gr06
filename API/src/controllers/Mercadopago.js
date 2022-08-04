const { User, Order, Category } = require("../db");
const { Router } = require("express");
const { transporter } = require("../utils/nodeMailer");
const router = Router();
const mercadopago = require("mercadopago");
const { DB_HOST, ACCES_TOKEN, VITE_URL_API, VITE_URL_API_DATA, MAILUSER } = process.env;

const BASE_URL2 =
  DB_HOST === "localhost"
    ? "http://localhost:5000"
    : "https://nueva-prueba-sin-variables.vercel.app/";


mercadopago.configure({
  access_token: ACCES_TOKEN
})

router.get("/pagos", async (req, res) => {
  try {
    console.log("Pagos");
    const payment_id = req.query.payment_id;
    const payment_status = req.query.status;
    const external_reference = req.query.external_reference;
    const merchant_order_id = req.query.merchant_order_id;

    // return res.status(200).send(req.query);
    const order = await Order.findByPk(external_reference, {
      include: [
        {
          model: User
        }]
    });
    console.log("Ext Ref: " + external_reference)
    order.payment_id = payment_id;
    order.payment_status = payment_status;
    order.merchant_order_id = merchant_order_id;
    order.external_reference = external_reference;
    if (payment_status === "approved") {
      order.stateId = 4;
      await transporter.sendMail({
        from: '"App Vinos" <' + MAILUSER + '>',
        to: order.dataValues.user.dataValues.email,
        subject: "Estado de Orden de Compra Actualizado.",
        text: "AppVinos le informa que el estado de su orden de compra no. " + external_reference + " ha sido actualizado a: Procesando",
      });
    } else if (payment_status === "Cancelled") {
      order.stateId = 5;
    }
    console.log("Actualizando Orden");
    await order.save();
    return res.redirect(VITE_URL_API);
    // return res.redirect('http://localhost:3000');
  } catch (error) {
    return res.status(400).send("Error: " + error)
  }
})

router.get("/:idorder", async (req, res) => {
  try {
    let mont = 0;
    const { idorder } = req.params;
    const order = await Order.findByPk(parseInt(idorder))
    console.log("IdOrder: " + idorder)
    const user = await User.findByPk(parseInt(order.dataValues.userId));
    let projects = await order.getProducts(); // -
    let productsClient = await Promise.all(projects.map(async (f) => {
      return {
        id: f.dataValues.id,
      };
    }
    ));

    let claves = Object.keys(productsClient);
    for (let i = 0; i < claves.length; i++) {
      let clave = claves[i];
      let nameCategor = await Category.findByPk(parseInt(clave));
      if (nameCategor) {
        array = {
          id: claves[i],
          name: nameCategor.dataValues.name
        }
      }
    }

    let productsCar = projects.map(e => {
      let mont1 = e.dataValues.price * e.dataValues.productXorder.cant;
      mont = mont + mont1

      return {
        id: e.dataValues.id,
        title: e.dataValues.name,
        quantity: e.dataValues.productXorder.cant,
        description: e.dataValues.description,
        //   category_id: array,
        unit_price: e.dataValues.price,
        currency_id: "PEN"
      };
    });
    // console.log(productsCar)
    let users = {
      name: user.dataValues.name,
      dni: user.dataValues.dni,
      username: user.dataValues.username,
      email: user.dataValues.email,
      mont: mont
    }


    let preference = {
      items: productsCar,
      external_reference: `${idorder}`,
      payer: users,
      back_urls: {
        success: `${VITE_URL_API_DATA}/mercadopago/pagos`,
        failure: `${VITE_URL_API_DATA}/mercadopago/pagos`,
        pending: `${VITE_URL_API_DATA}/mercadopago/pagos`,
      }
    }
    // success: `http://localhost:5000/mercadopago/pagos`,
    // failure: `http://localhost:5000/mercadopago/pagos`,
    // pending: `http://localhost:5000/mercadopago/pagos`,
    mercadopago.preferences
      .create(preference)
      .then(function (response) {
        // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
        global.id = response.body.id;
        global.url = response.body.sandbox_init_point;
        // console.log(response.body);
        return res.json({ id: global.id, url: global.url });
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (e) {
    res.status(400).send("Error: " + e)
  }
})



module.exports = router;

const mercadopago = require("mercadopago");

mercadopago.configure({
    access_token:process.env.ACCES_TOKEN,
});
module.exports={
    mercadopago
}
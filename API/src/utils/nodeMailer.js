const nodemailer = require("nodemailer");
const { MAILUSER, MAILPASS } = process.env;


// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: MAILUSER, // generated ethereal user
    pass: MAILPASS, // generated ethereal password
  },
});

transporter.verify().then( () => {
  console.log('Listo para Enviar correos.');
})

module.exports = { transporter };
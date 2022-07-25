const { User, Order, Car, Category} = require("../db");
const upload = require("../libs/storage");
const { Router } = require("express");
const router = Router();
const mercadopago = require("mercadopago");
const { DB_HOST,ACCES_TOKEN } = process.env;

const BASE_URL2 =
  DB_HOST === "localhost"
    ? "http://localhost:5000"
    : "https://nueva-prueba-sin-variables.vercel.app/";


    mercadopago.configure({
        access_token: ACCES_TOKEN
    })


    router.get("/:iduser", async (req, res) => {
        
        try{
            let mont=0;
            const { iduser } = req.params;
            const user = await User.findByPk(parseInt(iduser));
            let projects = await user.getProducts(); // -
            let productsClient = await Promise.all(projects.map( async (f)=>{
              return{
                id: f.dataValues.id,
              };
            }
            ));

            let claves = Object.keys(productsClient);
            for(let i=0; i< claves.length; i++){
          let clave = claves[i];
          let nameCategor = await Category.findByPk(parseInt(clave));
          if(nameCategor){
            array = {
              id: claves[i],
              name: nameCategor.dataValues.name
            }
          }
        }
        
              let productsCar = projects.map( e=> {
                let mont1 = e.dataValues.price * e.dataValues.car.cant;
                mont = mont + mont1
                
                return{
                  id: e.dataValues.id,
                  title: e.dataValues.name,
                  quantity: e.dataValues.car.cant,
                  description: e.dataValues.description,
                //   category_id: array,
                  unit_price: e.dataValues.price,
                  currency_id: "PEN"
                };
              });
              console.log(productsCar)
               let users = {
                 name: user.dataValues.name,
                 dni: user.dataValues.dni,
                 username: user.dataValues.username,
                 email: user.dataValues.email,
                 mont: mont
               }


               let preference = {
                items: productsCar,
                external_reference: `${user.dataValues.id}`,
                payer: users,
                back_urls: {
                  success: 'http://localhost:5000/home',
                  failure: 'http://localhost:5000/home',
                  pending: 'http://localhost:5000/home',
                }
            }        
        mercadopago.preferences
           .create(preference)
           .then(function (response) {
               // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
           global.id= response.body.id;
           console.log(response.body);
           res.json({id: global.id});
              })
           .catch(function (error) {
             console.log(error);
           });
        }catch (e) {
        res.status(400).send("Error: " + e)
    }
    })
    
      module.exports = router
    
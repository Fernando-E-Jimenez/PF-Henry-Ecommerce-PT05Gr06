const { Review, Rol, User } = require("../db");
const { Router } = require('express');
const router = Router();

router.get("/", async function(req, res, next){
    try {
        const roles = await Rol.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        res.status(200).send(roles);;
    } catch (error) {
        res.status(400).send("***Error***")
    }
})


router.post("/", async function(req, res, next){
    try {
        const {
            description
          } = req.body;

          let rol = await Rol.create({
            description,
          });
          res.status(200).send(rol);
    } catch (error) {
        res.status(400).send("***Error***")
    }
})

module.exports = router;
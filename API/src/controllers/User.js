const { Review } = require("../db");
const { Router } = require('express');
const router = Router();

router.post("/:id/review", async (req, res) => {
    try {
      const { id } = req.params
      const {
        description,
        star
      } = req.body;
      console.log(description, star)
      let reviewNew = await Review.create({
        description,
        star,
        productId: id
      });
      res.status(200).send(reviewNew);
    } catch (e) {
      res.status(400).send("***Error***")
    }
  })
  
  module.exports = router
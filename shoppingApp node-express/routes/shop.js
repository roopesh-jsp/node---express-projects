const express = require("express");

const productsController = require("../controllers/products");

const router = express.Router();

router.get("/products/:prodId", productsController.viewProduct);
router.get("/", productsController.getproducts);
router.post("/add-cart", productsController.addToCart);
router.get("/cart", productsController.getCart);
router.post("/remove-cart", productsController.removeCart);
module.exports = router;

const express = require("express");

const productsController = require("../controllers/products");

const router = express.Router();

router.get("/products/:prodId", productsController.viewProduct);
router.get("/", productsController.getproducts);

module.exports = router;

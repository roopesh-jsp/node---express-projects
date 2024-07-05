const express = require("express");

const productController = require("../controllers/products");

const router = express.Router();

router.get("/add", productController.getaddProducts);
router.post("/add", productController.postaddPtoducts);

module.exports = router;

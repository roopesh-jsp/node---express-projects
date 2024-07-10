const express = require("express");

const productController = require("../controllers/products");

const route = express.Router();

route.get("/add", productController.addProduct);
route.post("/add", productController.postProduct);

route.post("/add/edit", productController.addProduct);
route.post("/edit", productController.postProduct);

route.post("/del", productController.postDel);
module.exports = route;

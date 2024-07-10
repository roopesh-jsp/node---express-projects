const express = require("express");

const productController = require("../controllers/products");

const route = express.Router();

route.get("/", productController.getProduts);
route.post("/view", productController.PostView);
module.exports = route;

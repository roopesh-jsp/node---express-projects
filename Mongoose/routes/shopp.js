const express = require("express");
const route = express.Router();

const productsController = require("../controllers/products");

route.get("/", productsController.getHome);

route.get("/:id", productsController.GetView);

module.exports = route;

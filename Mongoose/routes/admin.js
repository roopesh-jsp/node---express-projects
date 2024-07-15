const express = require("express");
const route = express.Router();

const productsController = require("../controllers/products");

route.get("/add", productsController.getAddProduct);

route.post("/add", productsController.postAddProduct);

route.get("/admin", productsController.getAdminData);

route.post("/del", productsController.postDel);

route.get("/edit/:id", productsController.GetEdit);

route.post("/edit", productsController.PostEdit);

module.exports = route;

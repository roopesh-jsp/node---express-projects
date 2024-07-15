const express = require("express");
const route = express.Router();

const controller = require("../controllers/main");

route.get("/", controller.getHome);

route.get("/view", controller.getView);

module.exports = route;

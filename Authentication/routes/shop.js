const express = require("express");
const route = express.Router();

const controller = require("../controllers/main");
const auth = require("../middleware/auth");

route.get("/", controller.getHome);

route.get("/view", auth, controller.getView);

module.exports = route;

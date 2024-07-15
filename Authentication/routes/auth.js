const express = require("express");

const route = express.Router();

const controller = require("../controllers/main");

route.get("/signIn", controller.getSignIn);

route.post("/signIn", controller.postSignIn);

route.get("/logIn", controller.getLogIn);

route.post("/logIn", controller.postLogIn);

route.get("/logout", controller.Logout);

module.exports = route;

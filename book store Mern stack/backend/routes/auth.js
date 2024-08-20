const express = require("express");
const route = express.Router();

const { body } = require("express-validator");

const User = require("../models/User");
const authController = require("../controllers/auth");

route.post(
  "/signup",
  [
    body("email").isEmail().withMessage("not a mail"),
    body("password").trim().isLength({ min: 5 }),
  ],
  authController.signup
);

module.exports = route;

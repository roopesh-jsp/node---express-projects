const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.post("/forgot-pass", authController.forgotPassword);

router.post("/change-pass", authController.changePassword);

module.exports = router;

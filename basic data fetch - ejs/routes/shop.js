const express = require("express");
const router = express.Router();

const adminRoute = require("./admin");
router.get("/", (req, res) => {
  res.render("home.ejs", { docTitle: "nAistam", data: adminRoute.data });
});

module.exports = router;

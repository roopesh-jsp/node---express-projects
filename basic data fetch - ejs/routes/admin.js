const express = require("express");
const router = express.Router();

const data = [];
router.get("/add", (req, res) => {
  res.render("add.ejs", { docTitle: "add" });
});

router.post("/add", (req, res) => {
  data.push(req.body);
  res.redirect("/");
});

exports.router = router;
exports.data = data;

const products = require("../models/product");
exports.getaddProducts = (req, res) => {
  res.render("add.ejs", { docTitle: "add", path: "/add" });
};
exports.postaddPtoducts = (req, res) => {
  const data = new products(req.body.title);
  data.save();
  res.redirect("/");
};

exports.getproducts = (req, res) => {
  products.fethData((data) => {
    res.render("home.ejs", { docTitle: "nAistam", data: data, path: "/" });
  });
};

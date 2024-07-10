const product = require("../models/product");
const mongodb = require("mongodb");
exports.addProduct = (req, res) => {
  const isEdit = req.query.edit;
  const prodId = req.body.id;
  product.findById(prodId).then((x) => {
    res.render("add-product.ejs", {
      edit: isEdit,
      data: x,
    });
  });
};

exports.postProduct = (req, res) => {
  // const isEdit = req.query.edit;
  const prodId = req.body.id;

  const title = req.body.title;
  const price = req.body.price;
  const pr = new product(title, price, prodId);
  pr.save()
    .then((x) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduts = (req, res) => {
  product
    .findAll()
    .then((data) => {
      res.render("home.ejs", {
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostView = (req, res) => {
  const prodId = req.body.id;
  product.findById(prodId).then((x) => {
    res.render("view.ejs", {
      data: x,
    });
  });
};

exports.postDel = (req, res) => {
  const id = req.body.id;
  product
    .deleteById(id)
    .then((x) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

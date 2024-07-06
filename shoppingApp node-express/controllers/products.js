const product = require("../models/product");

exports.getproducts = (req, res, nxt) => {
  const xx = (data) => {
    res.render("home.ejs", {
      data: data,
      docTitle: "shop",
      path: "/",
    });
  };
  product.fethAll(xx);
};

exports.addProduct = (req, res) => {
  res.render("add-product.ejs", {
    docTitle: "add-product",
    path: "/add-product",
    edit: false,
  });
};
exports.viewProduct = (req, res) => {
  const id = req.params.prodId;
  product.findProduct(id, (data) => {
    console.log(data);
    res.render("prodDetails.ejs", {
      data: data,
      path: "/products",
      docTitle: data.title,
    });
  });
};

exports.postProduct = (req, res) => {
  const t = req.body.title;
  const p = req.body.price;
  const d = req.body.discription;
  const pr = new product(null, t, d, p);
  pr.save();
  res.redirect("/");
};

exports.getAdminData = (req, res) => {
  product.fethAll((pr) => {
    res.render("admin-view.ejs", {
      data: pr,
      path: "/admin",
      docTitle: "admin-view",
    });
  });
};

exports.getEdit = (req, res) => {
  const editMode = req.query.edit;
  const id = req.body.id;

  product.findProduct(id, (data) => {
    res.render("add-product.ejs", {
      docTitle: "add-product",
      path: "/edir=t-product",
      edit: editMode,
      data: data,
    });
  });
};

exports.postEdit = (req, res) => {
  const id = req.params.prodId;
  const t = req.body.title;
  const p = req.body.price;
  const d = req.body.discription;
  const pr = new product(id, t, d, p);
  pr.save();
  res.redirect("/admin");
};

exports.postDel = (req, res) => {
  const id = req.body.id;
  product.del(id);
  res.redirect("/admin");
};

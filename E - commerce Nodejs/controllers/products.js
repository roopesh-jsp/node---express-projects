const product = require("../models/product");

exports.getHome = (req, res) => {
  product.find().then((data) => {
    res.render("home.ejs", {
      data: data,
      docTitle: "home",
    });
  });
};

exports.getAddProduct = (req, res) => {
  res.render("addProduct.ejs", {
    docTitle: "add Products",
  });
};

exports.postAddProduct = (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const discription = req.body.discription;
  const image = req.body.image;
  const pr = new product({
    title: title,
    price: price,
    discription: discription,
    image: image,
  });
  pr.save().then(() => {
    res.redirect("/");
  });
};

exports.getAdminData = (req, res) => {
  product.find().then((data) => {
    res.render("admin.ejs", {
      data: data,
      docTitle: "admin",
    });
  });
};

exports.postDel = (req, res) => {
  const id = req.body.id;
  product.findByIdAndDelete(id).then(() => {
    res.redirect("/");
  });
};

exports.GetEdit = (req, res) => {
  const id = req.params.id;
  product.findById(id).then((data) => {
    console.log(data);
    res.render("editProduct.ejs", {
      docTitle: "add Products",
      data: data,
    });
  });
};

exports.PostEdit = (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const price = req.body.price;
  product
    .findById(id)
    .then((pr) => {
      console.log(pr);
      pr.title = title;
      pr.price = price;
      return pr.save();
    })
    .then(() => {
      res.redirect("/admin");
    });
};

exports.GetView = (req, res) => {
  const id = req.params.id;
  product.findById(id).then((pr) => {
    res.render("view.ejs", {
      data: pr,
      docTitle: "product-view",
    });
  });
};

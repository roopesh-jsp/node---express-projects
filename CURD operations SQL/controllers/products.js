const product = require("../models/product");
const cart = require("../models/cart");
const { where } = require("sequelize");

exports.getproducts = (req, res, nxt) => {
  product
    .findAll()
    .then((data) => {
      res.render("home.ejs", {
        data: data,
        docTitle: "shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
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
  product
    .findByPk(id)
    .then((data) => {
      res.render("prodDetails.ejs", {
        data: data,
        path: "/products",
        docTitle: data.title,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postProduct = (req, res) => {
  const t = req.body.title;
  const p = req.body.price;
  const d = req.body.discription;

  product
    .create({
      title: t,
      price: p,
      discription: d,
    })
    .then((x) => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getAdminData = (req, res) => {
  product
    .findAll()
    .then((pr) => {
      res.render("admin-view.ejs", {
        data: pr,
        path: "/admin",
        docTitle: "admin-view",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEdit = (req, res) => {
  const editMode = req.query.edit;
  const id = req.body.id;
  product
    .findByPk(id)
    .then((data) => {
      res.render("add-product.ejs", {
        docTitle: "add-product",
        path: "/edir=t-product",
        edit: editMode,
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEdit = (req, res) => {
  const id = req.params.prodId;
  const t = req.body.title;
  const p = req.body.price;
  const d = req.body.discription;
  product
    .findByPk(id)
    .then((pr) => {
      pr.title = t;
      pr.price = p;
      pr.discription = d;
      return pr.save();
    })
    .then((result) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDel = (req, res) => {
  const id = req.body.id;
  product
    .destroy({
      where: {
        id: id,
      },
    })
    .then((ress) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addToCart = (req, res) => {
  const id = req.body.id;
  const isCartView = req.query.cart;
  const isAdd = req.query.add;

  product.findProduct(id, (pr) => {
    if (isAdd) {
      cart.addToCart(id, pr.price, pr.title);
      if (!isCartView) {
        res.redirect("/");
      } else {
        res.redirect("/cart");
      }
    } else {
      cart.reduceCart(id, pr.price, pr.qnt);
      res.redirect("/cart");
    }
  });
};

exports.getCart = (req, res) => {
  cart.fethAll((cart) => {
    res.render("cart.ejs", {
      data: cart,
      docTitle: "cart",
      path: "/cart",
    });
  });
};

exports.removeCart = (req, res) => {
  const id = req.body.id;
  product.findProduct(id, (pr) => {
    cart.removeCart(pr.id, pr.price, pr.qnt);
    res.redirect("/cart");
  });
};

const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getHome = (req, res) => {
  res.render("home.ejs", {
    isAuth: req.session.isLogedIn,
  });
};

exports.getView = (req, res) => {
  res.render("view.ejs", {
    user: req.session.user,
  });
};

exports.getSignIn = (req, res) => {
  res.render("auth.ejs", {
    signIn: true,
  });
};

exports.postSignIn = (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  const confirmPass = req.body.confirmPassword;
  User.findOne({ email: email })
    .then((userr) => {
      if (userr) {
        return res.redirect("/signIn");
      }
      return bcrypt
        .hash(pass, 12)
        .then((hashedPass) => {
          const user = new User({
            email: email,
            password: hashedPass,
          });
          return user.save();
        })
        .then((x) => {
          res.redirect("/");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getLogIn = (req, res) => {
  res.render("auth.ejs", {
    signIn: false,
    error: req.flash("err")[0],
  });
};

exports.postLogIn = (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  User.findOne({ email: email })
    .then((x) => {
      if (!x) {
        res.redirect("/logIn");
      } else {
        bcrypt
          .compare(pass, x.password)
          .then((match) => {
            if (match) {
              req.session.isLogedIn = true;
              req.session.user = x;
              req.session.save((err) => {
                res.redirect("/");
              });
            } else {
              req.flash("err", "invalid crediantials");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.Logout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

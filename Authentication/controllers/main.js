const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getHome = (req, res) => {
  res.render("home.ejs");
};

exports.getView = (req, res) => {
  res.render("view.ejs");
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
  });
};

exports.postLogIn = (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  console.log(email, pass);
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
              res.redirect("/");
            } else {
              res.redirect("/logIn");
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
  res.cookie("cookie", "", {
    expires: new Date(Date.now()),
  });
  return res.status(200).json({ message: "User Logout Successfully" });
};

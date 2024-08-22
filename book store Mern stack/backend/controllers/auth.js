const User = require("../models/User");
const books = require("../models/book");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, nxt) => {
  const err = validationResult(req);
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  let existingUser;
  User.findOne({ email: email }).then((user) => {
    existingUser = user;
    if (existingUser) {
      const err = new Error();
      err.message = "user existis";
      err.statusCode = 404;
      //   throw err;
      nxt(err);
    } else {
      bcrypt
        .hash(password, 12)
        .then((hashedPw) => {
          const user = new User({
            email: email,
            password: hashedPw,
            name: name,
          });
          return user.save();
        })
        .then((result) => {
          res.json({ msg: "user created", userId: result._id });
        })
        .catch((err) => {
          err.message = "failed in password hashing and creating user";
          nxt(err);
        });
    }
  });
};

exports.login = (req, res, nxt) => {
  const { email, password } = req.body;
  console.log(email);

  let activeUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error(" email not registered");
        error.statusCode = 500;
        throw error;
      }
      activeUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isequal) => {
      if (!isequal) {
        const error = new Error("wrong credintials");
        error.statusCode = 500;
        throw error;
      }
      res.json({
        _id: activeUser._id,
        email: activeUser.email,
        name: activeUser.name,
        token: jwt.sign({ id: activeUser._id }, "secret", { expiresIn: "1d" }),
      });
    })
    .catch((err) => {
      console.log(err);

      err.message = "failed to login ...";
      nxt(err);
    });
};

//to be donee
exports.getBooks = (req, res, nxt) => {
  // User.findById(req.user._id)
  //   .populate("books")
  //   .then((user) => {
  //     console.log(user.books);
  //     res.json({
  //       data: user.books,
  //       msg: "sent",
  //     });
  //   });

  books.find({ _id: { $in: req.user.books } }).then((books) => {
    res.json({
      data: books,
      msg: "sent",
    });
  });
};

const User = require("../models/User");
const books = require("../models/book");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, nxt) => {
  const err = validationResult(req);
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  if (!email) {
    return res.json({ error: "enter email" });
  }
  if (!password || password.length < 5) {
    return res.json({ error: "password length should be more than 5" });
  }

  if (!name) {
    return res.json({ error: "enter your name" });
  }
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      console.log("redirecting");

      return res.json({ error: "user exists" });
    }

    const hashedPw = await bcrypt.hash(password, 12);

    const userr = await User.create({
      email: email,
      password: hashedPw,
      name: name,
    });
    return res.json({ sucess: "registered" });
  } catch (err) {
    console.log(err);

    err.message = "failed in password hashing and creating user";
    nxt(err);
  }
};

exports.login = async (req, res, nxt) => {
  const { email, password } = req.body;

  if (!email) {
    return res.json({ error: "enter email" });
  }
  if (!password) {
    return res.json({ error: "enter password" });
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      // const error = new Error(" email not registered");
      // error.statusCode = 500;
      // throw error;
      return res.json({ error: "no user found" });
    }

    const comparedPass = await bcrypt.compare(password, user.password);

    if (!comparedPass) {
      // const error = new Error("wrong credintials");
      // error.statusCode = 500;
      // throw error;
      return res.json({ error: "incorrect password" });
    }

    return res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRECT, {
        expiresIn: "1d",
      }),
      sucess: "logged in",
    });
  } catch (err) {
    console.log(err);

    err.message = "failed to login ...";
    nxt(err);
  }
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

  books
    .find({ _id: { $in: req.user.books } })
    .then((books) => {
      res.json({
        data: books,
        msg: "sent",
      });
    })
    .catch((err) => {
      nxt(err);
    });
};

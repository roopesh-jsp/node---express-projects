const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

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

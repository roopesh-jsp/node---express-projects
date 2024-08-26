const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, nxt) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRECT);
      req.user = await User.findById(decode.id);
      nxt();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("not authorised");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("not authorised, no token");
  }
});

module.exports = protect;

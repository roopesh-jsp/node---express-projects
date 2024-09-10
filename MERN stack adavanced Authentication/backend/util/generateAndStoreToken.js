const jwt = require("jsonwebtoken");

const generateAndStoreToken = async (userId, res) => {
  const token = jwt.sign({ userId }, "super", { expiresIn: "1d" });
  console.log("kk");

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
};
module.exports = generateAndStoreToken;

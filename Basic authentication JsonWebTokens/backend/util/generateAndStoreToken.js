const jwt = require("jsonwebtoken");

const generateAndStoreToken = async (userId, res) => {
  const token = jwt.sign({ userId }, "super", { expiresIn: "1d" });
  console.log("kk");

  res.cookie("token", token);
  return token;
};
module.exports = generateAndStoreToken;

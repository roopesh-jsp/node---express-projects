const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  title: String,
  discription: String,
});

module.exports = mongoose.model("users", userSchema);

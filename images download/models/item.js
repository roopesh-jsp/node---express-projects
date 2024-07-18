const mongoose = require("mongoose");
const itemSchema = mongoose.Schema({
  title: String,
  image: String,
  discription: String,
  imageExt: String,
});

module.exports = mongoose.model("Item", itemSchema);

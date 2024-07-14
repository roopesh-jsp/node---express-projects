const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  title: String,
  price: Number,
  discription: String,
  image: String,
});
module.exports = mongoose.model("product", productSchema);

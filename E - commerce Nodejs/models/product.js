const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  title: String,
  price: Number,
});
module.exports = mongoose.model("product", productSchema);

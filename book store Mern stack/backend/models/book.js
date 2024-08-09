const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishedYr: Number,
});

module.exports = mongoose.model("books", bookSchema);

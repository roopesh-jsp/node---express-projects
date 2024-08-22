const mongoose = require("mongoose");
const { schema } = require("./book");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  books: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: "books" },
    },
  ],
  // books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Books" }],
});

module.exports = mongoose.model("User", UserSchema);

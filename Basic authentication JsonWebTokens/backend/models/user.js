const { default: mongoose, Mongoose } = require("mongoose");

const user = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    forgotPasswordToken: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", user);

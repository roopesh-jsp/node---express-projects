const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_STRING);
    console.log("db connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDb;

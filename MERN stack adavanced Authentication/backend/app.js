const express = require("express");
const connectDb = require("./connectDB");
const dotenv = require("dotenv").config();
const app = express();

const authRoutes = require("./routes/auth.routes");

app.use(express.json());

app.use(authRoutes);

app.listen(process.env.PORT, () => {
  connectDb();
  console.log("app is running", process.env.PORT);
});

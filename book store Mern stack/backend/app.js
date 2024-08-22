const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const bookRoutes = require("./routes/booksRoutes");
const authRoutes = require("./routes/auth");

app.use(bodyParser.json());

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["get", "post", "delete"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/user", authRoutes);
app.use("/books", bookRoutes);

app.use((err, req, res, nxt) => {
  const status = err.statusCode || 500;
  console.log(err);
  res.status(status).json({ message: err.message });
});

mongoose
  .connect(
    "mongodb+srv://rupesh:1234@backenddb.itmt8yo.mongodb.net/bookStore?retryWrites=true&w=majority&appName=backendDB"
  )
  .then(() => {
    app.listen(3000);
  });

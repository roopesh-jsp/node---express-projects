const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const cros = require("cros");

const app = express();

const bookRoutes = require("./routes/booksRoutes");

app.use(bodyParser.json());

// app.use(cros());

app.use(bookRoutes);

app.use((err, req, res, nxt) => {
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message });
});

mongoose
  .connect(
    "mongodb+srv://rupesh:1234@backenddb.itmt8yo.mongodb.net/bookStore?retryWrites=true&w=majority&appName=backendDB"
  )
  .then(() => {
    app.listen(3000);
  });

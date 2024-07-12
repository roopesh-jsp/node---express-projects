const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const shopRoute = require("./routes/shopp");
const adminRoute = require("./routes/admin");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(shopRoute);
app.use(adminRoute);

async function init() {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(
      "mongodb+srv://rupesh:1234@backenddb.itmt8yo.mongodb.net/shop?retryWrites=true&w=majority&appName=backendDB"
    );
    app.listen(3000);
  } catch (error) {
    console.log(error);
    process.exit();
  }
}
init();

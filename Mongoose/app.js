const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

const shopRoute = require("./routes/shopp");
const adminRoute = require("./routes/admin");

// const user = require("./models/user");

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, nxt) => {
//   user.findById("66948d21d7b25b9c09bdd724").then((user) => {
//     req.user = user;
//     nxt();
//   });
// });

app.use(shopRoute);
app.use(adminRoute);

async function init() {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(
      "mongodb+srv://rupesh:1234@backenddb.itmt8yo.mongodb.net/shop?retryWrites=true&w=majority&appName=backendDB"
    );
    // user.findOne().then((user) => {
    //   if (!user) {
    //     const User = new user({
    //       name: "roopesh",
    //       email: "rupzkumar5@gmail.com",
    //       cart: {
    //         items: [],
    //       },
    //     });
    //     User.save();
    //   }
    // });
    app.listen(3000);
  } catch (error) {
    console.log(error);
    process.exit();
  }
}
init();

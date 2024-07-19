const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const sessions = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(sessions);
const csrf = require("csurf");
const flash = require("connect-flash");

const csrfProtection = csrf();

const app = express();

const ShopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  sessions({
    secret: "sdfasd sfdasfd",
    store: new mongoDbStore({
      uri: "mongodb+srv://rupesh:1234@backenddb.itmt8yo.mongodb.net/shop",
      collection: "sessions",
    }),
  })
);

app.use(csrfProtection);

app.use((req, res, nxt) => {
  res.locals.csrfToken = req.csrfToken();
  nxt();
});

app.use(flash());

app.set("engine view", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use(ShopRoutes);
app.use(authRoutes);

mongoose.connect(
  "mongodb+srv://rupesh:1234@backenddb.itmt8yo.mongodb.net/shop"
);
app.listen(3000);

const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const MongoConnect = require("./lib/database").MongoConnect;

const app = express();

app.set("engine view", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);

app.use(shopRoutes);

MongoConnect(() => {
  app.listen(3000);
});

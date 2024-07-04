const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.set("engine view", "ejs");
app.set("views", "views");

app.use(adminRoute.router);
app.use(shopRoute);

app.use((req, res) => {
  res.render("error.ejs");
});
app.listen(3000);

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("engine view", "ejs");
app.set("views", "views");

app.use(adminRoute);
app.use(shopRoute);

app.use((req, res) => {
  res.render("error.ejs");
});
app.listen(3000);

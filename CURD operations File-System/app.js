const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
app.set("engine view", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(shopRoutes);
app.use(adminRoutes);

app.use((req, res) => {
  res.send("page not found");
});
app.listen(3000);

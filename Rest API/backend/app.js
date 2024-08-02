const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userModal = require("./models/users");
const cors = require("cors");
const bodyParser = require("body-parser");

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Acess-Control-Allow-Methods", "get,post,delete,put,patch");
//   res.setHeader("Acess-Control-Allow-Headers", "*");
//   next();
// });
app.use(cors());
app.get("/posts", (req, res) => {
  userModal
    .find({})
    .then((users) => res.json(users))
    .catch((err) => {
      console.log(err);
    });
});
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://rupesh:1234@backenddb.itmt8yo.mongodb.net/shop?retryWrites=true&w=majority&appName=backendDB"
);
app.post("/create", (req, res) => {
  const user = new userModal({
    title: req.body.title,
    discription: req.body.discription,
  });
  user.save().then((x) => res.json(x));
});

app.get("/post/:id", (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params);

  userModal
    .findById(id)
    .then((x) => {
      console.log(x);
      return res.json(x);
    })
    .catch((err) => console.log(err));
});
app.listen(8080);

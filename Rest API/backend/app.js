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

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://rupesh:1234@backenddb.itmt8yo.mongodb.net/shop?retryWrites=true&w=majority&appName=backendDB"
);

app.get("/posts", async (req, res) => {
  try {
    const us = await userModal.find({});
    res.json(us);
  } catch (err) {
    console.log(err);
  }
});

app.post("/create", async (req, res) => {
  const user = new userModal({
    title: req.body.title,
    discription: req.body.discription,
  });
  await user.save().then((x) => res.json(x));
});

app.get("/post/:id", async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params);

  try {
    const user = await userModal.findById(id);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

app.get("/users/:id", (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  userModal
    .findById(id)
    .then((x) => res.json(x))
    .catch((err) => console.log(err));
});

app.put("/update/:id", async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  try {
    const user = await userModal.findByIdAndUpdate(id, {
      title: req.body.title,
      discription: req.body.discription,
    });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  try {
    const user = await userModal.findByIdAndDelete(id);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

app.listen(8080);

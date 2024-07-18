const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();

const Item = require("./models/item");
const item = require("./models/item");
const { log } = require("console");

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.set("view engine", "ejs");
app.set("views", "views");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.trim());
  },
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage }).single("image"));

app.get("/", (req, res) => {
  res.render("addItem");
});

app.get("/items", (req, res) => {
  Item.find()
    .then((items) => {
      res.render("items", {
        items: items,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/add", (req, res) => {
  const title = req.body.title;
  const image = req.file;
  const discription = req.body.discription;
//   console.log(image);
  const item = new Item({
    title: title,
    discription: discription,
    image: image.path,
    imageExt: image.mimetype.split("/")[1],
  });
  item.save().then((x) => {
    res.redirect("/items");
  });
});

app.post("/download/:id", (req, res) => {
  const id = req.params.id;
  Item.findOne({ _id: id }).then((item) => {
    fs.readFile(item.image, (err, data) => {
      if (err) {
        return console.log(err);
      }
      //   res.setHeader("Content-Type", "application/jpg");
      res.setHeader(
        "Content-Disposition",
        `attachment;filename=${item.title}.${item.imageExt}`
      );
      res.send(data);
    });
  });
});

mongoose
  .connect(
    "mongodb+srv://rupesh:1234@backenddb.itmt8yo.mongodb.net/test?retryWrites=true&w=majority&appName=backendDB"
  )
  .then((x) => {
    console.log("connected");
    app.listen(3000);
  });

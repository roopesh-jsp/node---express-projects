const path = require("path");
const fs = require("fs");
const process = require("process");

module.exports = class product {
  constructor(t) {
    this.title = t;
  }
  save() {
    // data.push(this);
    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );
    fs.readFile(p, (err, fileCont) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileCont);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }
  static fethData(cb) {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );
    fs.readFile(p, (err, fileCont) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileCont));
      }
    });
  }
};

const path = require("path");
const fs = require("fs");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);
const getFileData = (cb) => {
  fs.readFile(p, (err, fileCont) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileCont));
    }
  });
};
module.exports = class product {
  constructor(id, t, d, p) {
    this.title = t;
    this.discription = d;
    this.price = p;
    this.id = id;
  }
  save() {
    fs.readFile(p, (err, fileCont) => {
      let data = [];
      if (this.id) {
        data = JSON.parse(fileCont);
        const existingProdIndex = data.findIndex((el) => el.id === this.id);
        data[existingProdIndex] = this;
        fs.writeFile(p, JSON.stringify(data), (err) => {
          console.log(err);
        });
        return;
      }
      this.id = Math.random().toString();

      if (!err) {
        data = JSON.parse(fileCont);
      }
      data.push(this);
      fs.writeFile(p, JSON.stringify(data), (err) => {
        console.log(err);
      });
    });
  }
  static del(id) {
    getFileData((pr) => {
      const filteredData = pr.filter((el) => el.id !== id);
      fs.writeFile(p, JSON.stringify(filteredData), (err) => {
        console.log(err);
      });
    });
  }
  static fethAll(cb) {
    getFileData(cb);
  }
  static findProduct(id, cb) {
    getFileData((p) => {
      const prods = p.find((el) => el.id === id);
      cb(prods);
    });
  }
};

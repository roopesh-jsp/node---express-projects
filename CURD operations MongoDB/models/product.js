const mongodb = require("mongodb");
const getdb = require("../lib/database").getdb;

class product {
  constructor(t, p, id) {
    this.title = t;
    this.price = p;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }
  save() {
    const db = getdb();
    let opdb;
    if (this._id) {
      opdb = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      opdb = db.collection("products").insertOne(this);
    }
    return opdb
      .then((r) => {
        console.log(r);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static findAll() {
    const db = getdb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((x) => x)
      .catch((err) => {
        console.log(err);
      });
  }
  static findById(id) {
    const db = getdb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(id) })
      .toArray()
      .then((x) => x)
      .catch((err) => {
        console.log(err);
      });
  }
  static deleteById(id) {
    const db = getdb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(id) });
  }
}
module.exports = product;

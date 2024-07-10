const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;
const MongoConnect = (cb) => {
  MongoClient.connect(
    "mongodb+srv://rupesh:1234@backenddb.itmt8yo.mongodb.net/?retryWrites=true&w=majority&appName=backendDB"
  )
    .then((client) => {
      _db = client.db();
      cb();
    })
    .catch((err) => console.log(err));
};

const getdb = () => {
  if (_db) {
    return _db;
  }
  throw "NO DATABASE FOUND";
};

exports.MongoConnect = MongoConnect;
exports.getdb = getdb;

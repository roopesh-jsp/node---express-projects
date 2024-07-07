const fs = require("fs");
const path = require("path");
const product = require("../models/product");
const { json } = require("body-parser");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);
module.exports = class cart {
  static addToCart(id, price, title) {
    fs.readFile(p, (err, fileCont) => {
      let cart = {
        cartItems: [],
        totalAmount: 0,
      };
      if (!err) {
        cart = JSON.parse(fileCont);
      }
      const existingItemIndex = cart.cartItems.findIndex((el) => el.id === id);
      const existingItem = cart.cartItems[existingItemIndex];
      if (existingItem) {
        existingItem.qnt = existingItem.qnt + 1;
        cart.cartItems[existingItem] = existingItem;
      } else {
        const newCartItem = {
          id: id,
          qnt: 1,
          price: price,
          title: title,
        };
        cart.cartItems = [...cart.cartItems, newCartItem];
      }
      cart.totalAmount = cart.totalAmount + +price;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
  static reduceCart(id, price, qnt) {
    if (qnt === 1) {
      return this.reduceCart(id, price, qnt);
    }
    fs.readFile(p, (err, fileCont) => {
      let cart = {
        cartItems: [],
        totalAmount: 0,
      };
      if (!err) {
        cart = JSON.parse(fileCont);
      }
      const existingItemIndex = cart.cartItems.findIndex((el) => el.id === id);
      let existingItem = cart.cartItems[existingItemIndex];
      existingItem = {
        ...existingItem,
        qnt: existingItem.qnt - 1,
      };
      cart.cartItems[existingItemIndex] = existingItem;
      cart.totalAmount = cart.totalAmount - price;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
  static removeCart(id, price, qnt) {
    fs.readFile(p, (err, fileCont) => {
      let cart = {
        cartItems: [],
        totalAmount: 0,
      };
      if (!err) {
        cart = JSON.parse(fileCont);
      }
      const updatedCart = { ...cart };
      updatedCart.cartItems = updatedCart.cartItems.filter((el) => el.id != id);
      updatedCart.totalAmount = updatedCart.totalAmount - qnt * price;
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }
  static fethAll(cb) {
    fs.readFile(p, (err, fileCont) => {
      if (!err) {
        cb(JSON.parse(fileCont));
      } else {
        cb([]);
      }
    });
  }
};

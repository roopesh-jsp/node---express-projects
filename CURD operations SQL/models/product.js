const Sequelize = require("sequelize");
const sequelize = require("../lib/database");

const product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: Sequelize.STRING,
  price: Sequelize.DOUBLE,
  discription: Sequelize.STRING,
});

module.exports = product;

const Sequelize = require("sequelize");
const sequelize = new Sequelize("node-db", "root", "Arupesh@123", {
  host: "localhost",
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});
module.exports = sequelize;

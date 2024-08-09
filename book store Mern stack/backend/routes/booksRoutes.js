const express = require("express");
const routes = express.Router();

const bookController = require("../controllers/books");

routes.get("/", bookController.getBooks);

routes.post("/add", bookController.addBook);

routes.get("/:bookId", bookController.getBook);

routes.put("/:bookId", bookController.editBook);

routes.delete("/:bookId", bookController.deleteBook);

module.exports = routes;

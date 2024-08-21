const express = require("express");
const routes = express.Router();

const bookController = require("../controllers/books");
const protect = require("../middleware/protect");

routes.get("/", bookController.getBooks);

routes.post("/add", protect, bookController.addBook);

routes.get("/:bookId", bookController.getBook);

routes.put("/:bookId", protect, bookController.editBook);

routes.delete("/:bookId", protect, bookController.deleteBook);

module.exports = routes;

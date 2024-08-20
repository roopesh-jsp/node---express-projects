const Books = require("../models/book");

exports.getBooks = (req, res, nxt) => {
  Books.find({})
    .then((books) => {
      if (books.length === 0) {
        res.json({ message: "no books found" });
        return;
      }
      res.status(200).json(books);
    })
    .catch((err) => {
      err.message = "failed to fetch data";
      nxt(err);
    });
};

exports.addBook = (req, res, nxt) => {
  const title = req.body.title;
  const author = req.body.author;
  const publishedYr = req.body.publishedYr;
  console.log(req.body);

  const newBook = new Books({
    title,
    author,
    publishedYr,
  });
  newBook.save().then(() => {
    res.json({ message: "booksaved" });
  });
};

exports.getBook = (req, res, nxt) => {
  const id = req.params.bookId;
  Books.findById(id)
    .then((book) => {
      if (!book) {
        const err = new Error();
        err.message = "book not found";
        err.statusCode = 404;
        throw err;
      }
      res.json(book);
    })
    .catch((err) => {
      nxt(err);
    });
};

exports.editBook = (req, res, nxt) => {
  const id = req.params.bookId;
  const title = req.body.title;
  const author = req.body.author;
  const publishedYr = req.body.publishedYr;
  Books.findByIdAndUpdate(id, {
    title,
    author,
    publishedYr,
  })
    .then(() => {
      res.json({ message: "book updated" });
    })
    .catch((err) => {
      nxt(err);
    });
};

exports.deleteBook = (req, res, nxt) => {
  console.log("deleting...");

  const id = req.params.bookId;
  Books.findByIdAndDelete(id)
    .then(() => {
      res.json({ message: "book deleted" });
    })
    .catch((err) => {
      nxt(err);
    });
};

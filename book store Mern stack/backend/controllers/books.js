const Books = require("../models/book");
const User = require("../models/User");

exports.getBooks = (req, res, nxt) => {
  Books.find({})
    .then((books) => {
      // if (books.length === 0) {
      //   res.json({ message: "no books found" });
      //   return;
      // }
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
  let id;
  const newBook = new Books({
    title,
    author,
    publishedYr,
    creator: req.user._id,
  });
  newBook
    .save()
    .then((res) => {
      return User.findById(req.user._id);
    })
    .then((user) => {
      user.books.push(newBook);
      return user.save();
    })
    .then((x) => {
      res.json({ message: "booksaved" });
    })
    .catch((err) => {
      err.message = "failed to add the book";
      nxt(err);
    });
};

exports.getBook = (req, res, nxt) => {
  const id = req.params.bookId;
  Books.findById(id)
    .populate("creator", "email")
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
  const id = req.params.bookId;
  console.log(id);

  Books.findByIdAndDelete(id)
    .then(() => {
      res.json({ message: "book deleted" });
      return User.findById(req.user._id);
    })
    .then((user) => {
      user.books = user.books.filter((bk) => {
        console.log(bk._id.toString());

        return bk._id.toString() !== id.toString();
      });
      return user.save();
    })
    .then((x) => {
      console.log(x);

      console.log("deleted");
    })
    .catch((err) => {
      nxt(err);
    });
};

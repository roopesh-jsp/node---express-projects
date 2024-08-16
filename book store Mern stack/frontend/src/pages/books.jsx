import React, { useEffect, useState } from "react";

export default function Books() {
  const [books, setBooks] = useState([]);
  function getBooks() {
    fetch("http://localhost:3000")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBooks(data);
      });
  }
  useEffect(() => {
    getBooks();
  }, []);

  // useEffect(() => {
  //   async function getMeals() {
  //     const response = await fetch("http://localhost:3000");
  //     const data = await response.json();
  //     setBooks(data);
  //   }
  //   getMeals();
  // }, []);

  return (
    <div className="container">
      {books.map((book, idx) => {
        return (
          <div key={book._id} className="book">
            <h1>
              <span>{book.title}</span>
            </h1>
            <h4>
              <span className="sideHead">Author : </span>
              <span className="cont">{book.author}</span>
            </h4>
            <h4>
              <span className="sideHead">published on : </span>
              <span className="cont">{book.publishedYr}</span>
            </h4>
          </div>
        );
      })}
    </div>
  );
}

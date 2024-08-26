import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

export default function Books() {
  const [books, setBooks] = useState([]);
  const { getCookie } = useAuth();
  const { token } = getCookie();
  function getBooks() {
    axios.get("/books").then((res) => {
      setBooks(res.data);
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
      {books.length === 0 && <h1 className="center">no books found</h1>}
      {books &&
        books.map((book, idx) => {
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
              <div className="cta">
                <Link to={`/book/${book._id}`}>
                  <button className="btn-1">view</button>
                </Link>
                {/* <button
                  className="btn-2"
                  onClick={() => handleDelete(book._id)}
                >
                  delete
                </button> */}
              </div>
            </div>
          );
        })}
    </div>
  );
}

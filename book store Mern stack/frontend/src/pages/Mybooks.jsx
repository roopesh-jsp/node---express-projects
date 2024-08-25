import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/AuthContext";
import { Link } from "react-router-dom";

export default function Mybooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getCookie } = useAuth();
  const { token } = getCookie();

  function getData() {
    setLoading(true);
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .get("http://localhost:3000/user/books", { headers })
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  function handleDelete(id) {
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .delete(`http://localhost:3000/books/${id}`, { headers })
      .then((res) => {})
      .catch((err) => console.log(err));
    getData();
  }

  return (
    <>
      {loading && <h1>Loading ... </h1>}
      {books.length === 0 && <h1>no books </h1>}
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
              <div className="cta">
                <Link to={`/book/${book._id}?mybook=true`}>
                  <button className="btn-1">view</button>
                </Link>
                <button
                  className="btn-2"
                  onClick={() => handleDelete(book._id)}
                >
                  delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

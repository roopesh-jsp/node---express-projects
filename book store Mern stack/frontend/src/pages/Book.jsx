import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function Book() {
  const [book, setBook] = useState();
  const { id } = useParams();

  const location = useLocation();
  const querParms = new URLSearchParams(location.search);
  const mybooks = querParms.get("mybook");

  function getBook() {
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getBook();
  }, []);
  return (
    <div className="bookPg">
      {book && (
        <div className="stack">
          <h1>{book.title}</h1>
          <h2>{book.author}</h2>
          <h3>published year : {book.publishedYr}</h3>
        </div>
      )}
      {mybooks && (
        <Link to={`/edit/${id}?edit=true`}>
          <button>edit</button>
        </Link>
      )}
    </div>
  );
}

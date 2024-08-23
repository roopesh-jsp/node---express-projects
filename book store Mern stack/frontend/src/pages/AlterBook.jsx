import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../store/AuthContext";
export default function AlterBook() {
  const [data, setData] = useState();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [yr, setYr] = useState("");

  const { token } = useAuth();

  const location = useLocation();
  const querParms = new URLSearchParams(location.search);
  const edit = querParms.get("edit");

  const { id } = useParams();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const headers = { Authorization: `Bearer ${token}` };
    if (!edit) {
      const formdata = new FormData(e.currentTarget);
      const data = Object.fromEntries(formdata);

      axios
        .post("http://localhost:3000/books/add", { ...data }, { headers })
        .then((res) => {
          navigate("/");
        });
    } else {
      axios
        .put(
          `http://localhost:3000/books/${id}`,
          {
            title,
            author,
            publishedYr: yr,
          },
          { headers }
        )
        .then((res) => {
          navigate(`/book/${id}`);
        })
        .catch((err) => console.log(err));
    }
  }

  function getData() {
    axios.get(`http://localhost:3000/books/${id}`).then((res) => {
      setTitle(res.data.title);
      setAuthor(res.data.author);
      setYr(res.data.publishedYr);
    });
  }

  useEffect(() => {
    if (edit) {
      getData();
    }
  }, []);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="number"
          name="publishedYr"
          value={yr}
          onChange={(e) => setYr(e.target.value)}
        />
        <button>ADD</button>
      </form>
    </div>
  );
}

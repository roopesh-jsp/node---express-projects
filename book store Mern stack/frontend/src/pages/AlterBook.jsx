import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../store/AuthContext";
import Loader from "../components/Loader";
export default function AlterBook() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [yr, setYr] = useState("");

  const { getCookie } = useAuth();
  const { token, userId } = getCookie();

  const location = useLocation();
  const querParms = new URLSearchParams(location.search);
  const edit = querParms.get("edit");

  const { id } = useParams();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    buttonRef.current.diasbled = true;
    const headers = { Authorization: `Bearer ${token}` };
    if (!edit) {
      const formdata = new FormData(e.currentTarget);
      const data = Object.fromEntries(formdata);

      axios.post("books/add", { ...data }, { headers }).then((res) => {
        navigate("/");
        setLoading(false);
        buttonRef.current.diasbled = false;
      });
    } else {
      axios
        .put(
          `books/${id}`,
          {
            title,
            author,
            publishedYr: yr,
            userId,
          },
          { headers }
        )
        .then((res) => {
          navigate(`/book/${id}`);
          setLoading(false);
          buttonRef.current.diasbled = false;
        })
        .catch((err) => {
          setLoading(false);
          buttonRef.current.diasbled = false;
          console.log(err);
        });
    }
  }

  function getData() {
    axios.get(`books/${id}`).then((res) => {
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
    <div className="stack">
      <h1>{edit ? "edit" : "add book"}</h1>
      <form onSubmit={handleSubmit}>
        {loading && <Loader />}
        <div className="group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
          />
        </div>
        <div className="group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            id="author"
          />
        </div>
        <div className="group">
          {" "}
          <label htmlFor="yr">published year</label>
          <input
            type="number"
            name="publishedYr"
            value={yr}
            onChange={(e) => setYr(e.target.value)}
            id="yr"
          />
        </div>
        <div className="cta">
          <button ref={buttonRef}>{edit ? "edit" : "add"}</button>
        </div>
      </form>
    </div>
  );
}

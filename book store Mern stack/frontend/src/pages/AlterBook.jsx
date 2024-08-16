import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function AlterBook() {
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const data = Object.fromEntries(formdata);
    axios.post("http://localhost:3000/add", { ...data }).then((res) => {
      console.log("book added");
      navigate("/");
    });
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" />
        <input type="text" name="author" />
        <input type="number" name="publishedYr" />
        <button>ADD</button>
      </form>
    </div>
  );
}

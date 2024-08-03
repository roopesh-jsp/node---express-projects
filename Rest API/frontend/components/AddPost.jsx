import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UpdatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [dis, setDis] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:8080/create", { title, discription: dis })
      .then((x) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        type="text"
        name="discription"
        placeholder="discription"
        onChange={(e) => setDis(e.target.value)}
      />
      <button>submit</button>
    </form>
  );
}

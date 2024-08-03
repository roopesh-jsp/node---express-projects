import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [dis, setDis] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:8080/users/" + id)
      .then((data) => {
        setTitle(data.data.title);
        setDis(data.data.discription);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    //     axios
    //       .post("http://localhost:8080/create", { title, discription: dis })
    //       .then((x) => {
    //         navigate("/");
    //       })
    //       .catch((err) => console.log(err));

    axios
      .put("http://localhost:8080/update/" + id, { title, discription: dis })
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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        type="text"
        name="discription"
        placeholder="discription"
        value={dis}
        onChange={(e) => setDis(e.target.value)}
      />
      <button>update</button>
    </form>
  );
}

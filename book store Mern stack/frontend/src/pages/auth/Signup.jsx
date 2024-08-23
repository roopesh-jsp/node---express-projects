import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const data = Object.fromEntries(formdata);
    console.log(data);

    axios
      .post("http://localhost:3000/user/signup", {
        email: data.email,
        name: data.name,
        password: data.password,
      })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="form">
      <h1>signup</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E mail</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <div className="cta">
          <button>register</button>
          <Link to="/login">already registered ?</Link>
        </div>
      </form>
    </div>
  );
}

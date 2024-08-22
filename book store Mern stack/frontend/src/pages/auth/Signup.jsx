import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const data = Object.fromEntries(formdata);
    console.log(data);
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

import React from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = Object.fromEntries(formdata);

    const res = await fetch("http://localhost:3000/signup", {
      method: "post",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dxx = await res.json();
    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <input type="text" placeholder="name" name="name" />
      <button>sigin</button>
    </form>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  async function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const fdata = Object.fromEntries(formdata);

    const response = await fetch("http://localhost:3000/login", {
      method: "post",
      body: JSON.stringify(fdata),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    if (res.sucess) {
      navigate("/");
      setError(null);
    } else {
      setError(res.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />

      {error && <p>{error}</p>}
      <button>login</button>
    </form>
  );
}

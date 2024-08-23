import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";
import axios from "axios";
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const data = Object.fromEntries(formdata);
    if (data.email.trim() != "") {
      axios
        .post("http://localhost:3000/user/login", {
          email: data.email,
          password: data.password,
        })
        .then((res) => {
          login(res.data.name, res.data.token);
        });

      navigate("/", { replace: true });
    }
  }
  return (
    <div className="form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E mail</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password" />

        <div className="cta">
          <button>logIn</button>
          <Link to="/signup">didn't have a account ?</Link>
        </div>
      </form>
    </div>
  );
}

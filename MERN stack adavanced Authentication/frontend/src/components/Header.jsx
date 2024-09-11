import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

export default function Header() {
  const navigate = useNavigate();
  function handleLogout() {
    Cookie.remove("token");
    navigate("/login");
  }
  return (
    <nav>
      <Link to="/">HOME</Link>
      <Link to="/signup">SIGN IN</Link>
      <Link to="/login">LOGIN</Link>
      <button onClick={handleLogout}>logout</button>
    </nav>
  );
}

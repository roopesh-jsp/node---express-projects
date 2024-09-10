import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav>
      <Link to="/">HOME</Link>
      <Link to="/signup">SIGN IN</Link>
      <Link to="/login">LOGIN</Link>
    </nav>
  );
}

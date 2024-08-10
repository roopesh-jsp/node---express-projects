import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav>
      <Link to="/">
        {" "}
        <h1>books</h1>
      </Link>
      <Link to="/add">
        {" "}
        <button>ADD</button>
      </Link>
    </nav>
  );
}

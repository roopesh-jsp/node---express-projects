import React from "react";
import { Link } from "react-router-dom";
export default function () {
  return (
    <div className="container">
      <h1>login to use this feature</h1>
      <Link to="/login">login</Link>
    </div>
  );
}

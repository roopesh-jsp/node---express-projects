import React from "react";
import { Link } from "react-router-dom";

export default function Protector() {
  return (
    <div className="center">
      first login
      <Link to="/login">login</Link>
    </div>
  );
}

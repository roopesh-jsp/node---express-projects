import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import useToken from "../hooks/useToken";

export default function Header() {
  const navigate = useNavigate();
  const token = useToken();
  function handleLogout() {
    Cookie.remove("token");
    navigate("/login");
  }
  return (
    <header>
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        HOME
      </NavLink>
      {token ? (
        <button onClick={handleLogout}>logout</button>
      ) : (
        <div className="cta">
          <NavLink
            to="/signup"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            SIGN IN
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            LOGIN
          </NavLink>
        </div>
      )}
    </header>
  );
}

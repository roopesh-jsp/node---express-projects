import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

export default function Header() {
  const { getCookie, logout } = useAuth();
  const { token, name } = getCookie();

  return (
    <nav>
      <Link to="/">
        {" "}
        <h1>books</h1>
      </Link>
      <div className="navbar">
        <Link to="/add">
          {" "}
          <button>ADD</button>
        </Link>
        <Link to="/mybooks">My books</Link>

        <div className="userAuth">
          {token ? (
            <>
              <p>{name}</p>
              <button onClick={logout}>logout</button>
            </>
          ) : (
            <Link to="/login">login/signin</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

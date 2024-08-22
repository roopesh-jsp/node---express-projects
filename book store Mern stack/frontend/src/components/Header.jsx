import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
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

        <div className="userAuth">
          {user ? (
            <>
              <p>{user}</p>
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

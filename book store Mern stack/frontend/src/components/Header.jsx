import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

export default function Header() {
  const { getCookie, logout } = useAuth();
  const { token, name } = getCookie();

  const [showNav, setShowNav] = useState(false);
  // if (showNav) {
  //   document.body.classList.add("stopScroll");
  // } else {
  //   document.body.classList.remove("stopScroll");
  // }
  function handleHamburger() {
    setShowNav((prev) => !prev);
  }
  function handleLogout() {
    logout();
    handleHamburger();
  }

  return (
    <nav>
      {showNav && <div className="overlay" onClick={handleHamburger}></div>}
      <Link to="/">
        {" "}
        <h1>books</h1>
      </Link>

      <div className={`navbar ${showNav ? "showNav" : ""}`}>
        {token && (
          <>
            <Link to="/add">
              {" "}
              <button onClick={handleHamburger}>ADD</button>
            </Link>

            <Link to="/mybooks" onClick={handleHamburger}>
              My books
            </Link>
          </>
        )}

        <div className="userAuth">
          {token ? (
            <>
              <p>{name}</p>
              <button onClick={handleLogout}>logout</button>
            </>
          ) : (
            <Link to="/login" className="login" onClick={handleHamburger}>
              login/signin
            </Link>
          )}
        </div>
      </div>
      <div className={`hamburger `} onClick={handleHamburger}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
}

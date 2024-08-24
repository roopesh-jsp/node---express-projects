import React, { createContext, useContext, useState } from "react";

import { jwtDecode } from "jwt-decode";

import Cookie from "js-cookie";
const authContext = createContext();

export default function AuthContext({ children }) {
  const [auth, setAuth] = useState({});

  function login(username, token) {
    const decode = jwtDecode(token);
    Cookie.remove("jwt-token");
    Cookie.remove("name");
    Cookie.set("name", username);
    Cookie.set("jwt-token", token);
    setAuth({
      name: Cookie.get("name"),
      token: Cookie.get("jwt-token"),
    });
  }

  function getCookie() {
    return {
      name: Cookie.get("name"),
      token: Cookie.get("jwt-token"),
    };
  }

  function logout() {
    Cookie.remove("jwt-token");
    Cookie.remove("name");
    setAuth({});
  }

  return (
    <authContext.Provider value={{ getCookie, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

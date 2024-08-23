import React, { createContext, useContext, useState } from "react";
import cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";
const authContext = createContext();

export default function AuthContext({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  function login(username, token) {
    setUser(username);
    setToken(token);

    const decode = jwtDecode(token);
    console.log(decode);

    const cookies = new Cookies();
    cookies.set("jwt_token", token);
  }
  function logout() {
    setUser(null);
  }

  return (
    <authContext.Provider value={{ user, token, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

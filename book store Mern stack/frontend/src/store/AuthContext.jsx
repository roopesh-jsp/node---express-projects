import React, { createContext, useContext, useState } from "react";

const authContext = createContext();

export default function AuthContext({ children }) {
  const [user, setUser] = useState(null);

  function login(username) {
    setUser(username);
  }
  function logout() {
    setUser(null);
  }

  return (
    <authContext.Provider value={{ user, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

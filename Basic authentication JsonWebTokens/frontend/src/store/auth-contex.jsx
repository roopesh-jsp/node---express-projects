import React, { useContext, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  user: {},
  signup: () => {},
  login: () => {},
  logout: () => {},
});

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function signup(data) {
    const response = await fetch("http://localhost:3000/signup", {
      method: "post",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    console.log(res);

    if (res.sucess) {
      setError(null);
      setUser(res.user);
      console.log(res);
      navigate("/");
    } else {
      setError(res.message);
    }
    return {
      error,
      user,
    };
  }

  const ctxValue = {
    user,
    signup,
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const data = useContext(AuthContext);
  return data;
}

import React from "react";
import { useAuth } from "./store/AuthContext";
import Protector from "./pages/auth/Protector";

export default function RouteProtector({ children }) {
  const { getCookie } = useAuth();
  const { token } = getCookie();
  if (!token) {
    return <Protector />;
  }
  return <>{children}</>;
}

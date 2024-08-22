import React from "react";
import { useAuth } from "./store/AuthContext";
import Protector from "./pages/auth/Protector";

export default function RouteProtector({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Protector />;
  }
  return <>{children}</>;
}

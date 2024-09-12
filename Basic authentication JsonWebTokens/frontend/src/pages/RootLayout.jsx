import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import AuthContextProvider from "../store/auth-contex";

export default function RootLayout() {
  return (
    <div>
      <AuthContextProvider>
        <Header />
        <Outlet />
      </AuthContextProvider>
    </div>
  );
}

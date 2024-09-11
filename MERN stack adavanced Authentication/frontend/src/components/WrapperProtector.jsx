import React from "react";
import useToken from "../hooks/useToken";
import Protector from "./Protector";

export default function WrapperProtector({ children }) {
  const token = useToken();
  if (!token) {
    return <Protector />;
  }
  return <>{children}</>;
}

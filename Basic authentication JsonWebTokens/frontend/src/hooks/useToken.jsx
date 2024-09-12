import React, { useState } from "react";
import Cookie from "js-cookie";

export default function useToken() {
  const token = Cookie.get("token");

  return token;
}

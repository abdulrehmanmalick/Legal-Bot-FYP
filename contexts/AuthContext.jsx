"use client";
import { getCookie } from "cookies-next";
import { createContext, useState } from "react";
import { object } from "zod";

export const Auth = createContext(null);

function AuthContext({ children }) {
  const authCookie = getCookie("AuthContext");
  const user = useState(authCookie ? JSON.parse(authCookie):null);

  return <Auth.Provider value={user}>{children}</Auth.Provider>;
}

export default AuthContext;

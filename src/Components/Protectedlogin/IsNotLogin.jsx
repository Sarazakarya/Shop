import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function IsNotLogin({ children }) {
  const isAuth = useSelector((state) => state.login.user.isAuth);
  if (isAuth) return <Navigate to={"/"} />;
  return <>{children}</>;
}

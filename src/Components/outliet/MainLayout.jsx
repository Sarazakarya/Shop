import React from "react";
import Nav from "../Nav";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

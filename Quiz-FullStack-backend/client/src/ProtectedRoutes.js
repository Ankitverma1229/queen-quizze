import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  let login = localStorage.getItem("loginToken");

  return login ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;

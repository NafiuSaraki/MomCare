import React from "react";
import { Navigate } from "react-router-dom";

const AuthRedirect = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // ko duk inda kake ajiye token

  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

export default AuthRedirect;
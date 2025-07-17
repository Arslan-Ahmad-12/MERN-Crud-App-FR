import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const { accessToken } = useSelector((state) => state.auth);
  
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthGuard;

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RedirectIfAuthenticated = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If authenticated, redirect to the profile page
  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  // If not authenticated, render the children (e.g., the login page)
  return children;
};

export default RedirectIfAuthenticated;

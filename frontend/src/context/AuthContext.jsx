import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/auth/check-auth");
        setIsAuthenticated(response.data.success);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    // Only call checkAuth if the current route is not a public route
    const isPublicRoute = ["/signup", "/verify-email", "/login"].includes(
      window.location.pathname
    );

    if (!isPublicRoute) {
      checkAuth();
    }
  }, []);

  const login = () => setIsAuthenticated(true); // Define login function
  const logout = () => setIsAuthenticated(false); // Define logout function

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

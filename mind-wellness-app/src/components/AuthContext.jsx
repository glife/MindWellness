import React, { createContext, useContext, useState, useEffect } from "react";

// Create a Context
const AuthContext = createContext();

// Custom hook to access the context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  // Load the token from localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  // Set token in both state and localStorage
  const setToken = (token) => {
    setAuthToken(token);
    localStorage.setItem("authToken", token); // Store in localStorage
  };

  // Clear token from state and localStorage (for logout)
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ authToken, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

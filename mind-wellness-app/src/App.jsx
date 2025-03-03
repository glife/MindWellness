import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Community from "./components/Community";
import { AuthProvider } from "./components/AuthContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authToken"));

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Checking Auth Token in App:", token); // Debugging
    setIsAuthenticated(!!token);
  }, []);
  

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/community" element={isAuthenticated ? <Community /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
<<<<<<< HEAD
import Community from "./components/Community"; // Import Community Page
=======
import Community from "./components/Community";
import { AuthProvider } from "./components/AuthContext";
>>>>>>> 43b2324846f46b3c7c8ae17c51b268735416ce17

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

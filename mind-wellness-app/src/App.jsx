import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Community from "./components/Community"; // Import Community Page
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/community" element={<Community />} /> {/* Added Community Page */}
        </Routes>
      </Router>
    </AuthProvider>
    
  );
}

export default App;

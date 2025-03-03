import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Community from "./components/Community"; // Import Community Page
import Aichat from "./components/Aichat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/community" element={<Community />} /> {/* Added Community Page */}
      </Routes>
    </Router>
  );
}

export default App;

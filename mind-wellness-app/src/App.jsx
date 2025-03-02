import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Component } from "react";
import Signup from "./components/Signup"; // If inside src/components/
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

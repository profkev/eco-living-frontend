import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Goals from './pages/Goals'; // Import Goals
import CarbonFootprint from './pages/CarbonFootprint';


const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/carbon-footprint" element={<CarbonFootprint />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;

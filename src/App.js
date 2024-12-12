import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Goals from './pages/Goals';
import Recommendations from './pages/Recommendations';
import Challenges from './pages/Challenges';
import Bonus from './pages/Bonus';
import CarbonFootprint from './pages/CarbonFootprint';
import CommunityGroups from './pages/CommunityGroups';
import SubmitFeedback from './pages/SubmitFeedback';
import ViewFeedback from './pages/ViewFeedback';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/carbon-footprint" element={<CarbonFootprint />} />
          <Route path="/bonus" element={<Bonus />} />
          <Route path="/community-groups" element={<CommunityGroups />} />
          <Route path="/submit-feedback" element={<SubmitFeedback />} />
          <Route path="/view-feedback" element={<ViewFeedback />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

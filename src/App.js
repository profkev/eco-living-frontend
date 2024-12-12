import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SidePanel from './components/SidePanel'; // Import the SidePanel component
import Home from './pages/Home'; // Test with just the Home component
import Register from './pages/Register';
import Login from './pages/Login';
import Goals from './pages/Goals';
import Recommendations from './pages/Recommendations';
import Challenges from './pages/Challenges';
import Bonus from './pages/Bonus';
import CarbonFootprint from './pages/CarbonFootprint';
import CommunityGroups from './pages/CommunityGroups';
import SubmitFeedback from './pages/SubmitFeedback';
import ViewFeedback from './pages/ViewFeedback';
import UpdateProfile from './pages/UpdateProfile';

const App = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Fixed Side Panel */}
        <SidePanel />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/carbon-footprint" element={<CarbonFootprint />} />
            <Route path="/bonus" element={<Bonus />} />
            <Route path="/community-groups" element={<CommunityGroups />} />
            <Route path="/submit-feedback" element={<SubmitFeedback />} />
            <Route path="/view-feedback" element={<ViewFeedback />} />
            <Route path="/profile" element={<UpdateProfile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

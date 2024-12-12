import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Eco-Living App</h1>
      <p className="text-lg mb-4">
        Join us in making sustainable living easy and achievable!
      </p>
      <div className="flex gap-4">
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
        <Link to="/register" className="text-blue-500 hover:underline">
          Register
        </Link>
        <Link to="/goals" className="text-blue-500 hover:underline">
          Manage Goals
        </Link>
        <Link to="/carbon-footprint" className="text-blue-500 hover:underline">
          Track Carbon Footprint
        </Link>
        <Link to="/recommendations" className="text-blue-500 hover:underline">
          Recommendations
        </Link>
        <Link to="/challenges" className="text-blue-500 hover:underline">
          Challenges
        </Link>
        <Link to="/bonus" className="text-blue-500 hover:underline">
          Bonus
        </Link>
        <Link to="/community-groups" className="text-blue-500 hover:underline">
          Community Groups
        </Link>
        <Link to="/submit-feedback" className="text-blue-500 hover:underline">
          Submit Feedback
        </Link>
        <Link to="/view-feedback" className="text-blue-500 hover:underline">
          View Feedback (Admin)
        </Link>
      </div>
    </div>
  );
};

export default Home;

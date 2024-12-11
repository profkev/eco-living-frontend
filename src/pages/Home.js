import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">
          Welcome to Eco-Living App
        </h1>
        <p className="text-gray-700 mb-6">
          Join us in making sustainable living easy and achievable!
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

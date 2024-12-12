import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-6 text-blue-900">
        Welcome to Eco-Living App
      </h1>
      <p className="text-lg mb-8 text-gray-700 text-center max-w-2xl">
        Join us in making sustainable living easy and achievable! Explore all
        the features to make a positive impact on the environment.
      </p>
      {/* Features Card */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          Eco-Living Features
        </h2>
        <ul className="list-disc pl-8 space-y-2 text-gray-700">
          <li>Track your goals and progress.</li>
          <li>Monitor your carbon footprint.</li>
          <li>Participate in community challenges.</li>
          <li>Earn bonuses and rewards for achievements.</li>
          <li>Join community groups to share ideas and feedback.</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;

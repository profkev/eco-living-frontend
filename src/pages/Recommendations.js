import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Recommendations = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseURL = process.env.REACT_APP_API_BASE_URL || 'https://eco-living-backend.onrender.com';

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/recommendations`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setTips(response.data.tips || []);
      } catch (error) {
        console.error('Error fetching recommendations:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [baseURL]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Personalized Recommendations</h1>
      {loading ? (
        <p>Loading recommendations...</p>
      ) : (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Tips to Reduce Your Environmental Impact</h2>
          {tips.length > 0 ? (
            <ul className="list-disc pl-6">
              {tips.map((tip, index) => (
                <li key={index} className="mb-2">{tip}</li>
              ))}
            </ul>
          ) : (
            <p>No recommendations available. Log your activities to get tips.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Recommendations;

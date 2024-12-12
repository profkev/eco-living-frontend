import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);

  // Dynamically set the API base URL based on the environment
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/feedback`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFeedbacks(response.data.feedbacks);
      } catch (error) {
        console.error('Error fetching feedbacks:', error.response?.data || error.message);
        setError('Failed to fetch feedback.');
      }
    };

    fetchFeedbacks();
  }, [API_BASE_URL]);

  return (
    <div className="p-4 bg-white shadow rounded max-w-2xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Feedbacks</h2>
      {error && <p className="text-red-500">{error}</p>}
      {feedbacks.length > 0 ? (
        <ul>
          {feedbacks.map((feedback) => (
            <li key={feedback._id} className="mb-4 border-b pb-2">
              <p>
                <strong>User:</strong> {feedback.userId?.name || 'Unknown'} (
                {feedback.userId?.email || 'Unknown Email'})
              </p>
              <p>
                <strong>Date:</strong>{' '}
                {feedback.feedbackDate
                  ? new Date(feedback.feedbackDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'Date not available'}
              </p>
              <p>
                <strong>Feedback:</strong> {feedback.feedbackText}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No feedbacks available.</p>
      )}
    </div>
  );
};

export default ViewFeedback;

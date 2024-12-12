import React, { useState } from 'react';
import axios from 'axios';

const SubmitFeedback = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await axios.post(
        'http://localhost:5000/api/feedback', // Base URL remains unchanged
        { feedbackText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setSuccess('Feedback submitted successfully!');
      setFeedbackText('');
    } catch (error) {
      console.error('Error submitting feedback:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to submit feedback.');
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Submit Feedback</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Write your feedback here..."
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitFeedback;

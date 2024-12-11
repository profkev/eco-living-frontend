import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [formData, setFormData] = useState({
    goalType: '',
    target: '',
    completionDate: '',
  });

  const baseURL = process.env.REACT_APP_API_BASE_URL || 'https://eco-living-backend.onrender.com';

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/goals`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setGoals(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGoals();
  }, [baseURL]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/api/goals`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setGoals([...goals, response.data]);
      setFormData({ goalType: '', target: '', completionDate: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/api/goals/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setGoals(goals.filter((goal) => goal._id !== id));
    } catch (error) {
      console.error('Error deleting goal:', error.message);
    }
  };

  const handleUpdateProgress = async (id, newProgress) => {
    try {
      const response = await axios.put(
        `${baseURL}/api/goals/${id}`,
        { progress: newProgress },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setGoals(goals.map((goal) => (goal._id === id ? response.data : goal)));
    } catch (error) {
      console.error('Error updating progress:', error.message);
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Manage Your Goals</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Goal Type</label>
          <input
            type="text"
            name="goalType"
            placeholder="E.g., Reduce Carbon Footprint"
            value={formData.goalType}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Target</label>
          <input
            type="number"
            name="target"
            placeholder="E.g., 50"
            value={formData.target}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Completion Date</label>
          <input
            type="date"
            name="completionDate"
            value={formData.completionDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Add Goal
        </button>
      </form>
      <div className="mt-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Your Goals</h2>
        <ul>
          {goals.map((goal) => (
            <li key={goal._id} className="bg-white p-4 mb-2 rounded shadow-md">
              <div className="flex justify-between items-center mb-2">
                <span>
                  {goal.goalType} - {goal.progress}/{goal.target} (due{' '}
                  {new Date(goal.completionDate).toLocaleDateString()})
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateProgress(goal._id, Math.max(0, goal.progress - 10))}
                    className="text-blue-500 hover:underline"
                  >
                    - Progress
                  </button>
                  <button
                    onClick={() => handleUpdateProgress(goal._id, Math.min(goal.target, goal.progress + 10))}
                    className="text-green-500 hover:underline"
                  >
                    + Progress
                  </button>
                  <button
                    onClick={() => handleDelete(goal._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="relative w-full h-4 bg-gray-300 rounded">
                <div
                  className={`absolute top-0 left-0 h-4 rounded ${getProgressColor(
                    (goal.progress / goal.target) * 100
                  )}`}
                  style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Goals;

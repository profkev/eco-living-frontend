import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [newChallenge, setNewChallenge] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const baseURL = process.env.REACT_APP_API_BASE_URL || 'https://eco-living-backend.onrender.com';

  useEffect(() => {
    const fetchChallenges = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseURL}/api/challenges`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setChallenges(response.data);
      } catch (error) {
        console.error('Error fetching challenges:', error.response?.data || error.message);
        setError('Failed to load challenges. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [baseURL]);

  const joinChallenge = async (id) => {
    try {
      await axios.post(`${baseURL}/api/challenges/${id}/join`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('You have successfully joined the challenge!');
    } catch (error) {
      console.error('Error joining challenge:', error.response?.data || error.message);
      alert('Failed to join challenge. Please try again.');
    }
  };

  const viewParticipants = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/api/challenges/${id}/participants`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSelectedChallenge(id);
      setParticipants(response.data);
    } catch (error) {
      console.error('Error fetching participants:', error.response?.data || error.message);
      setError('Failed to load participants. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewChallengeChange = (e) => {
    setNewChallenge({ ...newChallenge, [e.target.name]: e.target.value });
  };

  const addNewChallenge = async (e) => {
    e.preventDefault();
    if (!newChallenge.name || !newChallenge.description || !newChallenge.startDate || !newChallenge.endDate) {
      alert('All fields are required to create a challenge.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${baseURL}/api/challenges`, newChallenge, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setChallenges([...challenges, response.data]);
      setNewChallenge({ name: '', description: '', startDate: '', endDate: '' });
      alert('Challenge added successfully!');
    } catch (error) {
      console.error('Error adding challenge:', error.response?.data || error.message);
      alert('Failed to add challenge. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Community Challenges</h1>

      {/* Add Challenge Form */}
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md mb-6">
        <h2 className="text-xl font-bold mb-4">Add a New Challenge</h2>
        <form onSubmit={addNewChallenge}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={newChallenge.name}
              onChange={handleNewChallengeChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="E.g., Plastic-Free Week"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={newChallenge.description}
              onChange={handleNewChallengeChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="Challenge description"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={newChallenge.startDate}
              onChange={handleNewChallengeChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">End Date</label>
            <input
              type="date"
              name="endDate"
              value={newChallenge.endDate}
              onChange={handleNewChallengeChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Add Challenge
          </button>
        </form>
      </div>

      {/* Available Challenges */}
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Available Challenges</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {challenges.map((challenge) => (
              <li key={challenge._id} className="mb-4">
                <h3 className="text-lg font-bold">{challenge.name}</h3>
                <p>{challenge.description}</p>
                <p>
                  Duration: {new Date(challenge.startDate).toLocaleDateString()} -{' '}
                  {new Date(challenge.endDate).toLocaleDateString()}
                </p>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
                  onClick={() => joinChallenge(challenge._id)}
                >
                  Join
                </button>
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded mt-2 ml-2"
                  onClick={() => viewParticipants(challenge._id)}
                >
                  View Participants
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Participants */}
      {selectedChallenge && (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md mt-6">
          <h2 className="text-xl font-bold mb-4">Participants</h2>
          <ul>
            {participants.length > 0 ? (
              participants.map((participant) => (
                <li key={participant.user._id} className="mb-2">
                  {participant.user.name} - Progress: {participant.progress}%
                </li>
              ))
            ) : (
              <p>No participants available.</p>
            )}
          </ul>
        </div>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Challenges;

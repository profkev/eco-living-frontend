import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Use environment variable or default to localhost
  const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  // Fetch profile details on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setName(data.name);
        setEmail(data.email);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.response?.data?.message || 'Failed to load profile.');
      }
    };

    fetchProfile();
  }, [baseURL]);

  // Handle profile update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const { data } = await axios.put(
        `${baseURL}/api/users/profile`,
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setSuccess('Profile updated successfully!');
      setName(data.name);
      setEmail(data.email);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile.');
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Update Profile</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;

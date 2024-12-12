import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BonusSystem = () => {
  const [bonuses, setBonuses] = useState([]);
  const [bonusData, setBonusData] = useState({ bonusType: '', value: '' });
  const [error, setError] = useState('');

  const baseURL = process.env.REACT_APP_API_BASE_URL || 'https://eco-living-backend.onrender.com';

  // Fetch bonuses on component mount
  useEffect(() => {
    const fetchBonuses = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/bonus`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setBonuses(response.data.bonuses);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch bonuses');
      }
    };
    fetchBonuses();
  }, [baseURL]);

  const handleInputChange = (e) => {
    setBonusData({ ...bonusData, [e.target.name]: e.target.value });
  };

  const addBonus = async () => {
    try {
      const response = await axios.post(`${baseURL}/api/bonus`, bonusData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setBonuses([...bonuses, response.data.bonus]);
      alert('Bonus added successfully!');
      setBonusData({ bonusType: '', value: '' }); // Reset form
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add bonus');
    }
  };

  const redeemBonus = async (id) => {
    try {
      const response = await axios.post(`${baseURL}/api/bonus/${id}/redeem`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Bonus redeemed successfully!');
      setBonuses(bonuses.map((bonus) => (bonus._id === id ? response.data.bonus : bonus)));
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to redeem bonus');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bonus System</h1>

      {/* Error Display */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Add Bonus Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Bonus</h2>
        <input
          type="text"
          name="bonusType"
          placeholder="Bonus Type"
          value={bonusData.bonusType}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          name="value"
          placeholder="Bonus Value"
          value={bonusData.value}
          onChange={handleInputChange}
          className="border p-2 mb-2 w-full"
        />
        <button
          onClick={addBonus}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Bonus
        </button>
      </div>

      {/* Bonuses List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Bonuses</h2>
        {bonuses.length > 0 ? (
          bonuses.map((bonus) => (
            <div key={bonus._id} className="border p-4 mb-2 rounded">
              <p>
                <strong>Type:</strong> {bonus.bonusType} | <strong>Value:</strong> {bonus.value} |{' '}
                <strong>Status:</strong> {bonus.redeemed ? 'Redeemed' : 'Not Redeemed'}
              </p>
              {!bonus.redeemed && (
                <button
                  onClick={() => redeemBonus(bonus._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-2"
                >
                  Redeem
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No bonuses available.</p>
        )}
      </div>
    </div>
  );
};

export default BonusSystem;

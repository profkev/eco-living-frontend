import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarbonFootprint = () => {
  const [logs, setLogs] = useState([]);
  const [formData, setFormData] = useState({
    transportation: '',
    energy: '',
    waste: '',
  });

  const baseURL = process.env.REACT_APP_API_BASE_URL || 'https://eco-living-backend.onrender.com';

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/carbon-logs`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setLogs(response.data);
      } catch (error) {
        console.error('Error fetching logs:', error.response?.data || error.message);
      }
    };
    fetchLogs();
  }, [baseURL]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseURL}/api/carbon-logs`,
        {
          transportation: formData.transportation,
          energyUsage: formData.energy,
          waste: formData.waste || 0,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setLogs((prevLogs) => [...prevLogs, response.data]);
      setFormData({ transportation: '', energy: '', waste: '' });
    } catch (error) {
      console.error('Error adding log:', error.response?.data || error.message);
    }
  };

  const calculateTrend = () => {
    return logs.reduce((sum, log) => sum + log.totalFootprint, 0) / logs.length || 0;
  };

  const getRecentLog = () => logs[logs.length - 1] || { transportation: 0, energyUsage: 0, waste: 0 };

  const getTotalFootprint = () => {
    return logs.reduce(
      (totals, log) => ({
        transportation: totals.transportation + log.transportation,
        energyUsage: totals.energyUsage + log.energyUsage,
        waste: totals.waste + log.waste,
      }),
      { transportation: 0, energyUsage: 0, waste: 0 }
    );
  };

  const renderBarChart = () => {
    const recentLog = getRecentLog();
    const maxValue = Math.max(recentLog.transportation, recentLog.energyUsage, recentLog.waste) || 1;
    return (
      <div className="mt-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Bar Chart (Most Recent Log)</h2>
        <div className="flex flex-col gap-2">
          <div>
            <span>Transportation:</span>
            <div className="h-4 bg-blue-500" style={{ width: `${(recentLog.transportation / maxValue) * 100}%` }} />
          </div>
          <div>
            <span>Energy:</span>
            <div className="h-4 bg-green-500" style={{ width: `${(recentLog.energyUsage / maxValue) * 100}%` }} />
          </div>
          <div>
            <span>Waste:</span>
            <div className="h-4 bg-red-500" style={{ width: `${(recentLog.waste / maxValue) * 100}%` }} />
          </div>
        </div>
      </div>
    );
  };

  const renderPieChart = () => {
    const totals = getTotalFootprint();
    const totalSum = totals.transportation + totals.energyUsage + totals.waste || 1;
    const transportPercentage = (totals.transportation / totalSum) * 100;
    const energyPercentage = (totals.energyUsage / totalSum) * 100;
    const wastePercentage = (totals.waste / totalSum) * 100;

    return (
      <div className="mt-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Pie Chart (Overall Footprint)</h2>
        <div
          className="relative w-40 h-40 rounded-full"
          style={{
            background: `conic-gradient(
              blue 0% ${transportPercentage}%,
              green ${transportPercentage}% ${transportPercentage + energyPercentage}%,
              red ${transportPercentage + energyPercentage}% 100%
            )`,
          }}
        />
        <div className="mt-4 text-sm">
          <p><span className="text-blue-500">●</span> Transportation: {transportPercentage.toFixed(2)}%</p>
          <p><span className="text-green-500">●</span> Energy: {energyPercentage.toFixed(2)}%</p>
          <p><span className="text-red-500">●</span> Waste: {wastePercentage.toFixed(2)}%</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Carbon Footprint Tracker</h1>

      {/* Form to Add Carbon Footprint Log */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Transportation (kg CO2)</label>
          <input
            type="number"
            name="transportation"
            placeholder="E.g., 10"
            value={formData.transportation}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Energy Use (kg CO2)</label>
          <input
            type="number"
            name="energy"
            placeholder="E.g., 5"
            value={formData.energy}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Waste (kg CO2)</label>
          <input
            type="number"
            name="waste"
            placeholder="E.g., 2"
            value={formData.waste}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Add Log
        </button>
      </form>

      {/* Historical Logs */}
      <div className="mt-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Historical Logs</h2>
        <ul className="divide-y divide-gray-200">
          {logs.length > 0 ? (
            logs.map((log) => (
              <li key={log._id} className="bg-white p-4 rounded shadow-sm mb-2">
                <div className="flex justify-between">
                  <span>Date: {new Date(log.date).toLocaleDateString()}</span>
                  <span>Total: {log.totalFootprint} kg CO2</span>
                </div>
                <p className="text-sm text-gray-600">
                  Transportation: {log.transportation} kg, Energy: {log.energyUsage} kg, Waste: {log.waste} kg
                </p>
              </li>
            ))
          ) : (
            <p>No logs available.</p>
          )}
        </ul>
      </div>

      {/* Visualizations */}
      {renderBarChart()}
      {renderPieChart()}

      {/* Average Daily Carbon Footprint */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">Average Daily Carbon Footprint</h2>
        <p className="text-lg">{calculateTrend().toFixed(2)} kg CO2</p>
      </div>
    </div>
  );
};

export default CarbonFootprint;

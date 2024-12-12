import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommunityGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  // Fetch groups on component mount
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/groups`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setGroups(response.data.groups);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching groups:', error.message);
        setError('Failed to load groups.');
        setLoading(false);
      }
    };

    fetchGroups();
  }, [baseURL]);

  // Handle Join Group
  const handleJoinGroup = async (id) => {
    try {
      await axios.post(`${baseURL}/api/groups/${id}/join`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('You have successfully joined the group!');
      setGroups((prev) =>
        prev.map((group) =>
          group._id === id ? { ...group, membershipCount: group.membershipCount + 1 } : group
        )
      );
    } catch (error) {
      console.error('Error joining group:', error.message);
      alert('Failed to join the group.');
    }
  };

  // Handle Leave Group
  const handleLeaveGroup = async (id) => {
    try {
      await axios.post(`${baseURL}/api/groups/${id}/leave`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('You have successfully left the group!');
      setGroups((prev) =>
        prev.map((group) =>
          group._id === id ? { ...group, membershipCount: group.membershipCount - 1 } : group
        )
      );
    } catch (error) {
      console.error('Error leaving group:', error.message);
      alert('Failed to leave the group.');
    }
  };

  if (loading) return <p>Loading groups...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Community Groups</h1>
      <div className="w-full max-w-2xl bg-white p-6 rounded shadow">
        {groups.length === 0 ? (
          <p>No groups available.</p>
        ) : (
          groups.map((group) => (
            <div key={group._id} className="mb-6 p-4 border rounded shadow">
              <h2 className="text-xl font-bold">{group.groupName}</h2>
              <p>Members: {group.membershipCount}</p>
              <div className="flex gap-4 mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => handleJoinGroup(group._id)}
                >
                  Join Group
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleLeaveGroup(group._id)}
                >
                  Leave Group
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommunityGroups;

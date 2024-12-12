import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SidePanel = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated by checking if a token exists
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login page
    setIsMenuOpen(false); // Close menu
  };

  const handleLinkClick = () => {
    // Close the menu on link click
    setIsMenuOpen(false);
  };

  return (
    <div>
      {/* Toggle Button for Mobile View */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-white bg-blue-900 p-2 fixed top-2 left-2 z-50 rounded focus:outline-none"
      >
        {isMenuOpen ? 'Close' : 'Menu'}
      </button>

      {/* Side Panel */}
      <div
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:block w-64 bg-gray-900 text-gray-100 flex flex-col shadow-lg h-screen fixed md:relative z-40`}
      >
        {/* Header */}
        <div className="p-4 text-center text-xl font-bold border-b border-gray-700">
          Navigation
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-2 p-4">
            <li>
              <Link
                to="/"
                onClick={handleLinkClick}
                className="flex items-center hover:bg-gray-800 px-4 py-2 rounded text-lg transition-all"
              >
                Home
              </Link>
            </li>
            {!isAuthenticated && (
              <>
                <li>
                  <Link
                    to="/login"
                    onClick={handleLinkClick}
                    className="flex items-center hover:bg-gray-800 px-4 py-2 rounded text-lg transition-all"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    onClick={handleLinkClick}
                    className="flex items-center hover:bg-gray-800 px-4 py-2 rounded text-lg transition-all"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated && (
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center hover:bg-gray-800 px-4 py-2 rounded text-lg transition-all w-full text-left"
                >
                  Log Out
                </button>
              </li>
            )}
            <li>
              <Link
                to="/goals"
                onClick={handleLinkClick}
                className="flex items-center hover:bg-gray-800 px-4 py-2 rounded text-lg transition-all"
              >
                Manage Goals
              </Link>
            </li>
            <li>
              <Link
                to="/carbon-footprint"
                onClick={handleLinkClick}
                className="flex items-center hover:bg-gray-800 px-4 py-2 rounded text-lg transition-all"
              >
                Carbon Footprint
              </Link>
            </li>
            <li>
              <Link
                to="/recommendations"
                onClick={handleLinkClick}
                className="flex items-center hover:bg-gray-800 px-4 py-2 rounded text-lg transition-all"
              >
                Recommendations
              </Link>
            </li>
            <li>
              <Link
                to="/challenges"
                onClick={handleLinkClick}
                className="flex items-center hover:bg-gray-800 px-4 py-2 rounded text-lg transition-all"
              >
                Challenges
              </Link>
            </li>
            <li>
              <Link
                to="/bonus"
                onClick={handleLinkClick}
                className="flex items-center hover:bg-gray-800 px-4 py-2 rounded text-lg transition-all"
              >
                Bonus
              </Link>
            </li>
            <li>
              <Link
                to="/community-groups"
                onClick={handleLinkClick}
                className="flex items-center hover:bg-gray-800 px-4 py-2 rounded text-lg transition-all"
              >
                Community Groups
              </Link>
            </li>
            <li>
              <Link
                to="/submit-feedback"
                onClick={handleLinkClick}
                className="flex items-center hover:bg-gray-800 px-4 py-2 rounded text-lg transition-all"
              >
                Submit Feedback
              </Link>
            </li>
            <li>
              <Link
                to="/view-feedback"
                onClick={handleLinkClick}
                className="flex items-center hover:bg-gray-800 px-4 py-2 rounded text-lg transition-all"
              >
                View Feedback (Admin)
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                onClick={handleLinkClick}
                className="flex items-center hover:bg-gray-800 px-4 py-2 rounded text-lg transition-all"
              >
                Update Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SidePanel;

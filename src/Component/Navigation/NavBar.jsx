import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';

function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-[#c45e56] bg-opacity-90 p-4">
      <div className="container mx-auto">
        <ul className="flex space-x-4 justify-end">
          <li>
            <Link to="/dashboard" className="text-white hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/team" className="text-white hover:text-gray-300">Team</Link>
          </li>
          <li>
            <Link to="/task" className="text-white hover:text-gray-300">Task</Link>
          </li>
          <li>
            <Link to="/profile" className="text-white hover:text-gray-300">Profile</Link>
          </li>
          {user ? (
            <li>
              <button onClick={logout} className="text-white hover:text-gray-300">Logout</button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="text-white hover:text-gray-300">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;

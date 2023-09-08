import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';

function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/dashboard">Home</Link>
        </li>
        <li>
          <Link to="/team">Team</Link>
        </li>
        <li>
          <Link to="/task">Task</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        {user ? (
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;

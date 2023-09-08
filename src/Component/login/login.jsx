import React, { useState } from 'react';
import localforage from 'localforage';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Retrieve user data by username from LocalForage
      const userData = await localforage.getItem(formData.username);

      if (!userData) {
        console.log('User not found.');
        return;
      }

      // Verify the password (you should hash and compare passwords in a real app)
      if (userData.password === formData.password) {
        console.log('Login successful!');
        // Perform login actions, e.g., redirect the user
      } else {
        console.log('Incorrect password.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

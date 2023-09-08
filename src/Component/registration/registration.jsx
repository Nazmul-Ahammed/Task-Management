import React, { useState } from 'react';
import localforage from 'localforage';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    picture: '',
    bio: '',
  });
  const [error, setError] = useState('');
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const checkUsernameExists = async (username) => {
    try {
      console.log(username);
      const keys = await localforage.keys();
      const userKey = keys.find((key) => key === username);
  
      if (userKey) {
        const userData = await localforage.getItem(userKey);
        console.log(userData);
        return userData;
      } else {
        console.log(`User with username '${username}' not found in LocalForage`);
        return null; // Return null to indicate that the user was not found
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error; // Rethrow the error for handling in the calling code if needed
    }
  };
  

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const usernameExists = await checkUsernameExists(formData.username);

    if (usernameExists) {
      setIsUsernameTaken(true);
      setError('Username is already taken');
      return;
    }

    try {
      // Generate a unique user ID (you may use a library like uuid)
      const userId = formData.username
      // Store user data in LocalForage
      await localforage.setItem(userId, {
        username: formData.username,
        password: formData.password, // Note: In a real app, hash the password
        picture: formData.picture,
        bio: formData.bio,
      });
      console.log(localforage.getItem(userId));

      navigate('/login')
      // Redirect the user to the login page or handle it as needed
      // You can use React Router for routing.
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Picture</label>
          <input
            type="text"
            name="picture"
            value={formData.picture}
            placeholder='Upload your picture in google drive and paste the link here. Make sure to give access.'
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
          />
        </div>
        {/* {isUsernameTaken && <div className="error">Username is already taken</div>} */}
        {error && <div className="error">{error}</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

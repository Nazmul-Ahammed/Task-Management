import React, { createContext, useContext, useState, useEffect } from 'react';
import localforage from 'localforage';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user data when the component mounts
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await localforage.getItem('user');
        if (storedUser) {
          setUser(storedUser);
        }
        setLoading(false); // Set loading to false once data is loaded
      } catch (error) {
        console.error('Error loading user data:', error);
        setLoading(false); // Set loading to false on error
      }
    };

    loadUser();
  }, []);

  const login = async (userData) => {
    setUser(userData);
    try {
      await localforage.setItem('user', userData);
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };

  const logout = async () => {
    setUser(null);
    try {
      await localforage.removeItem('user');
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  };

  // Return loading state to handle in your UI
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(user);
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

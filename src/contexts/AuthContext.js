import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token found in localStorage:', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser().catch((error) => {
        console.error('Error fetching user:', error);
        if (error.response && error.response.status === 401) {
          console.log('Token inválido, limpiando...');
          logout();
        }
      });
    } else {
      console.log('No token found in localStorage');
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      console.log('Fetching user profile...');
      const response = await api.get('/auth/profile/');
      console.log('User profile fetched successfully:', response.data);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      console.error('Response data:', error.response?.data);
      console.error('Status code:', error.response?.status);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      console.log('Attempting login...');
      const response = await api.post('/auth/login/', { username, password });
      console.log('Login successful, received token:', response.data.access);
      localStorage.setItem('token', response.data.access);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      console.error('Response data:', error.response?.data);
      throw error;
    }
  };

  const logout = () => {
    console.log('Logging out...');
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setLoading(false);
  };

  const register = async (userData) => {
    let originalToken;
    try {
      console.log('Attempting registration with:', userData);
      originalToken = api.defaults.headers.common['Authorization'];
      delete api.defaults.headers.common['Authorization'];
      
      const response = await api.post('/auth/register/', userData);
      console.log('Registration successful:', response.data);
      
      if (response.data.access) {
        localStorage.setItem('token', response.data.access);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        setUser(response.data.user);
      }
      
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Response data:', error.response?.data);
      console.error('Status code:', error.response?.status);
      console.error('Headers:', error.response?.headers);
      throw error;
    } finally {
      if (originalToken) {
        api.defaults.headers.common['Authorization'] = originalToken;
      }
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
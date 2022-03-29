import React, { useState, useEffect, createContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if(!user) loadUser();
  }, [user]);

  const login = async ({ username, password }) => {
    try {
      setLoading(true);
      const res = await axios.post('/api/auth/login', { username, password });
      if (res.data.success) {
        setIsAuthenticated(true);
        loadUser();
        setLoading(false);
        router.push('/');
      }
    } catch (err) {
      setLoading(false);
      setError(err.response && err.response.data.detail || err.response.data.error);
    }
  }

  const loadUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/auth/user');
      if (res.data.user) {
        setIsAuthenticated(true);
        setLoading(false);
        setUser(res.data.user);
      }
    } catch (err) {
      setLoading(false);
      setIsAuthenticated(false);
      setUser(null);
      setError(err.response && err.response.data.detail || err.response.data.error);
    }
  }

  const logout = async () => {
    try {
      const res = await axios.post('/api/auth/logout');
      if (res.data.success) {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (err) {
      setLoading(false);
      setIsAuthenticated(false);
      setUser(null);
      setError(err.response && err.response.data.detail || err.response.data.error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ loading, user, error, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

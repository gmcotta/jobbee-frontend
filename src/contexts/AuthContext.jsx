import React, { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const login = async ({ username, password }) => {
    try {
      setLoading(true);
      const res = await axios.post('/api/auth/login', { username, password });
      if (res.data.success) {
        setIsAuthenticated(true);
        setLoading(false);
        router.push('/');
      }
    } catch (err) {
      setLoading(false);
      setError(err.response && err.response.data.detail || err.response.data.error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ loading, user, error, isAuthenticated, login }}
    >
      {children}
    </AuthContext.Provider>
  );
}

import React, { useState, useEffect, createContext, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  return (
    <AuthContext.Provider
      value={{ loading, user, error, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

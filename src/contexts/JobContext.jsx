import React, { useState, useEffect, createContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [applied, setApplied] = useState(false);
  const [stats, setStats] = useState(null);

  const clearErrors = () => {
    setError(false);
  }

  const applyToJob = async ({ id, accessToken }) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}/apply/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      if (res.data.applied) {
        setLoading(false);
        setApplied(true);
      }
    } catch (err) {
      setLoading(false);
      setError(err.response && err.response.data.detail || err.response.data.error);
    }
  }

  const checkJobApplied = async ({ id, accessToken }) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}/check/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      setLoading(false);
      setApplied(res.data);
    } catch (err) {
      setLoading(false);
      setError(err.response && err.response.data.detail || err.response.data.error);
    }
  }

  const getTopicStats = async (topic) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stats/${topic}/`
      );
      setLoading(false);
      setStats(res.data)
    } catch (err) {
      setLoading(false);
      setError(err.response && err.response.data.detail || err.response.data.error);
    }
  }

  return (
    <JobContext.Provider
      value={{ 
        loading,
        error,
        updated,
        applied,
        stats,
        setUpdated,
        clearErrors,
        applyToJob,
        checkJobApplied,
        getTopicStats
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

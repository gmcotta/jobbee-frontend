import React, { useState, createContext } from 'react';
import axios from 'axios';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [applied, setApplied] = useState(false);
  const [created, setCreated] = useState(false);
  const [deleted, setDeleted] = useState(false);
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

  const newJob = async ({ data, accessToken }) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/new/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      if (res.data) {
        setLoading(false);
        setCreated(true);
      }
    } catch (err) {
      setLoading(false);
      setError(err.response && err.response.data.detail || err.response.data.error);
    }
  }

  const updateJob = async ({ id, data, accessToken }) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}/update/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      if (res.data) {
        setLoading(false);
        setUpdated(true);
      }
    } catch (err) {
      setLoading(false);
      setError(err.response && err.response.data.detail || err.response.data.error);
    }
  }

  const deleteJob = async ({ id, accessToken }) => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}/delete/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      if (res.data) {
        setLoading(false);
        setDeleted(true);
      }
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
        stats,
        applied,
        created,
        updated,
        deleted,
        setUpdated,
        setCreated,
        setDeleted,
        clearErrors,
        applyToJob,
        checkJobApplied,
        getTopicStats,
        newJob,
        updateJob,
        deleteJob
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

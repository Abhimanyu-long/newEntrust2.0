// src/context/AuthContext.js
import React, { createContext, useContext } from "react";
import axios from "axios";

const API_URL = "http://10.10.7.81:8000/auth";
console.log('API_URL:', API_URL);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const loginWithEmail = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/login`, data, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.error === false) {
        localStorage.setItem('access-token', response.data.data.accessToken);
        localStorage.setItem('id', response.data.data.userID);
        refresh();
      }
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Connection error");
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email }, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Connection error");
    }
  };

  const register = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/register`, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Connection error");
    }
  };

  const refresh = () => {
    setTimeout(() => { window.location.reload(); }, 1000);
  };

  return (
    <AuthContext.Provider value={{ loginWithEmail, forgotPassword, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

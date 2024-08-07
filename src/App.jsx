// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import { Dashboard } from './Pages/Dashboard';
import { Test } from './Pages/Test';
import { AuthProvider } from '../context/AuthContext';
import Protected from '../services/Protected';
import Redirect from '../services/Redirect';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Redirect Protect={Login} />} />
        <Route path="/register" element={<Redirect Protect={Register} />} />
        <Route path="/dashboard" element={<Protected Protect={Dashboard} />} />
        <Route path="/test" element={<Protected Protect={Test} />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

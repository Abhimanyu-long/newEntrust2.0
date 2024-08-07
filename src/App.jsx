import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import { Dashboard } from './Pages/Dashboard';
import { Test } from './Pages/Test';
import { AuthProvider } from '../context/AuthContext';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/test" element={<PrivateRoute element={<Test />} />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

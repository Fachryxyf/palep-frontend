import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('coach_token');

  if (!token) {
    // Jika tidak ada token, arahkan ke halaman login
    return <Navigate to="/login-coach" />;
  }

  // Jika ada token, tampilkan komponen anak (halaman yang dilindungi)
  return children;
};

export default ProtectedRoute;
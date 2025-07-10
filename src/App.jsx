// File: src/App.jsx

import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Credit from './pages/Credit';
import LoginCoach from './pages/LoginCoach';
import CoachDashboard from './pages/CoachDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Cek token saat aplikasi pertama kali dimuat
  useEffect(() => {
    const token = localStorage.getItem('coach_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Fungsi yang akan dipanggil oleh halaman Login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigate('/coach/dashboard');
  };

  // Fungsi yang akan dipanggil oleh Navbar
  const handleLogout = () => {
    localStorage.removeItem('coach_token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="app">
      <div className="background-blur"></div>

      {/* Kirim status login dan fungsi logout ke Navbar */}
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/credit" element={<Credit />} />
          {/* Kirim fungsi handleLoginSuccess ke halaman Login */}
          <Route path="/login-coach" element={<LoginCoach onLoginSuccess={handleLoginSuccess} />} />

          <Route
            path="/coach/dashboard"
            element={
              <ProtectedRoute>
                <CoachDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
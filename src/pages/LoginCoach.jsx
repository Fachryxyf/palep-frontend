// File: src/pages/LoginCoach.jsx

import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import axios from 'axios';
import '../styles/LoginCoach.css';
import { FaSignInAlt } from 'react-icons/fa';

// Terima 'onLoginSuccess' sebagai prop
const LoginCoach = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const API_URL = `${import.meta.env.VITE_API_URL}/auth/login`;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(API_URL, { username, password });
      if (response.data && response.data.token) {
        localStorage.setItem('coach_token', response.data.token);
        // Panggil fungsi dari App.jsx untuk memberitahu login berhasil
        onLoginSuccess();
      }
    } catch (err) {
      setError('Username atau password salah. Silakan coba lagi.');
      console.error('Login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... (kode JSX form tidak berubah)
    <div className="login-page-container">
      <Motion.div
        className="login-form-container"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <form onSubmit={handleLogin}>
          <h2><FaSignInAlt /> Login Pelatih</h2>
          <p>Halaman ini khusus untuk revisi data oleh pelatih.</p>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Memproses...' : 'Login'}
          </button>
        </form>
      </Motion.div>
    </div>
  );
};

export default LoginCoach;
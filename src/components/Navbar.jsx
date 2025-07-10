// File: src/components/Navbar.jsx

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { FaHome, FaInfoCircle, FaMedal, FaUserShield, FaTachometerAlt, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Navbar.css';

// Terima 'isLoggedIn' dan 'onLogout' sebagai props
function Navbar({ isLoggedIn, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoutClick = () => {
    toggleMenu(); // Tutup menu
    onLogout();   // Panggil fungsi logout dari App.jsx
  };

  return (
    <Motion.nav
      className="navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="/logo-gym.png" alt="Fit3Gym Logo" className="logo-image" />
          <h1>Fit3Gym</h1>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <div className={isMenuOpen ? 'navbar-links active' : 'navbar-links'}>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={toggleMenu}>
            <FaHome /><span>Home</span>
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={toggleMenu}>
            <FaInfoCircle /><span>About</span>
          </NavLink>
          <NavLink to="/credit" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={toggleMenu}>
            <FaMedal /><span>Credit</span>
          </NavLink>
          
          {isLoggedIn ? (
            <>
              <NavLink to="/coach/dashboard" className="nav-link coach-dashboard-link" onClick={toggleMenu}>
                <FaTachometerAlt /><span>Dashboard</span>
              </NavLink>
              <button onClick={handleLogoutClick} className="logout-button-nav">
                <FaSignOutAlt /><span>Logout</span>
              </button>
            </>
          ) : (
            <NavLink to="/login-coach" className="nav-link coach-login-link" onClick={toggleMenu}>
              <FaUserShield /><span>Login Pelatih</span>
            </NavLink>
          )}
        </div>
      </div>
    </Motion.nav>
  );
}

export default Navbar;
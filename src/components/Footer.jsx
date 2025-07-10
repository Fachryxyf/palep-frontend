// File: src/components/Footer.jsx

import React from 'react';
import { motion as Motion } from 'framer-motion'; // Perubahan di sini
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import '../styles/Footer.css';

const socialHover = {
  hover: {
    scale: 1.2,
    rotate: 360,
    transition: { duration: 0.4 }
  }
};

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <p>Sistem Pakar Rekomendasi Program Latihan pada FIT3GYM Jakarta Timur</p>
          <p>© {new Date().getFullYear()} - Skripsi Universitas Indraprasta PGRI</p>
        </div>
        <div className="footer-socials">
          <a href="#" aria-label="Instagram">
            {/* 'motion' diubah menjadi 'Motion' */}
            <Motion.div variants={socialHover} whileHover="hover">
              <FaInstagram className="social-icon" />
            </Motion.div>
          </a>
          <a href="#" aria-label="Facebook">
            <Motion.div variants={socialHover} whileHover="hover">
              <FaFacebookF className="social-icon" />
            </Motion.div>
          </a>
          <a href="#" aria-label="Twitter">
            <Motion.div variants={socialHover} whileHover="hover">
              <FaTwitter className="social-icon" />
            </Motion.div>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
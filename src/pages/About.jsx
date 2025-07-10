// File: src/pages/About.jsx

import React from 'react';
import { motion as Motion } from 'framer-motion';
import { FaUserCheck, FaBrain, FaLaptopCode } from 'react-icons/fa';
import '../styles/About.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Animasi anak-anaknya muncul berurutan
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <Motion.h2 initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          Tentang Sistem Ini
        </Motion.h2>
        
        <Motion.div
          className="about-features"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // Animasi akan berjalan saat di-scroll ke area pandang
          viewport={{ once: true, amount: 0.3 }}
        >
          <Motion.div className="feature-card" variants={itemVariants}>
            <FaUserCheck className="feature-icon" />
            <h3>Rekomendasi Personal</h3>
            <p>Memberikan program latihan yang disesuaikan secara personal berdasarkan usia, BMI, dan tujuan spesifik Anda, memastikan setiap sesi lebih efektif.</p>
          </Motion.div>

          <Motion.div className="feature-card" variants={itemVariants}>
            <FaBrain className="feature-icon" />
            <h3>Metode Cerdas (CBR)</h3>
            <p>Menggunakan metode Case-Based Reasoning untuk meniru cara berpikir seorang ahli, dengan belajar dari kasus-kasus latihan yang telah berhasil sebelumnya.</p>
          </Motion.div>

          <Motion.div className="feature-card" variants={itemVariants}>
            <FaLaptopCode className="feature-icon" />
            <h3>Teknologi Modern</h3>
            <p>Dibangun dengan arsitektur modern menggunakan React.js di sisi frontend dan Spring Boot di backend untuk performa yang cepat dan responsif.</p>
          </Motion.div>
        </Motion.div>
      </div>
    </section>
  );
}

export default About;
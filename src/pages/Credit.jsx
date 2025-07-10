// File: src/pages/Credit.jsx

import React from 'react';
import { motion as Motion } from 'framer-motion';
import '../styles/Credit.css';

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

function Credit() {
  return (
    <section id="credit" className="credit-section">
      <div className="credit-container">
        <Motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <img src="https://unindra.ac.id/sites/default/files/unindra%20kampus%20merdeka.png" alt="Logo Universitas Indraprasta PGRI" className="uni-logo" />
        </Motion.div>
        
        <h2>Credit & Acknowledgement</h2>
        
        <div className="credit-grid">
          <Motion.div className="credit-card" variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
            <h4>Penulis & Institusi</h4>
            <p><strong>Nama:</strong> Muhammad Berkah Pahlevi</p>
            <p><strong>NPM:</strong> 202143500618</p>
            <p><strong>Institusi:</strong> Universitas Indraprasta PGRI</p>
          </Motion.div>

          <Motion.div className="credit-card" variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
            <h4>Fakultas & Program Studi</h4>
            <p><strong>Fakultas:</strong> Teknik dan Ilmu Komputer</p>
            <p><strong>Program Studi:</strong> Teknik Informatika</p>
          </Motion.div>

          <Motion.div className="credit-card full-width" variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
            <h4>Judul Tugas Akhir</h4>
            <p>Sistem Pakar Rekomendasi Program Latihan pada FIT3GYM Jakarta Timur dengan Metode Case Based Reasoning (CBR)</p>
          </Motion.div>

          <Motion.div className="credit-card" variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
            <h4>Pembimbing Materi</h4>
            <p>Aprilia Sulistyohati, S.Kom., M.Eng.</p>
          </Motion.div>

          <Motion.div className="credit-card" variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
            <h4>Pembimbing Teknik</h4>
            <p>Dr. Atikah S.Kom., M.M.</p>
          </Motion.div>
        </div>
      </div>
    </section>
  );
}

export default Credit;
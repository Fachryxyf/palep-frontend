import React, { useState, useEffect } from 'react';
import { exportRecommendationToPDF } from '../services/pdfService';
import { FaDumbbell, FaHeartbeat, FaRunning } from 'react-icons/fa';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import '../styles/Home.css';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const formContainerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const formItemVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { ease: 'easeOut', duration: 0.5 } },
};

const Home = () => {
  const [activeTab, setActiveTab] = useState('input');
  const [formData, setFormData] = useState({
    nama: '',
    usia: '',
    jenisKelamin: '',
    beratBadan: '',
    tinggiBadan: '',
    tujuanLatihan: '',
    frekuensiLatihan: ''
  });
  const [recommendation, setRecommendation] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = `${import.meta.env.VITE_API_URL}/rekomendasi`;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Gagal mengambil riwayat');
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };
    fetchHistory();
  }, [API_URL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const heightInMeters = formData.tinggiBadan / 100;
      const bmi = formData.beratBadan / (heightInMeters * heightInMeters);
      const requestData = {
        nama: formData.nama,
        usia: parseInt(formData.usia),
        bmi: parseFloat(bmi.toFixed(2)),
        tujuanLatihan: formData.tujuanLatihan,
        frekuensiLatihan: parseInt(formData.frekuensiLatihan),
        jenisKelamin: formData.jenisKelamin
      };
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setRecommendation(data);
      setHistory(prev => [data, ...prev]);
      setFormData({ nama: '', usia: '', jenisKelamin: '', beratBadan: '', tinggiBadan: '', tujuanLatihan: '', frekuensiLatihan: '' });
      setActiveTab('recommendation');
    } catch (error) {
      console.error('Error fetching recommendation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Motion.div
      className="home-page-container"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="home-container">
        <div className="header-section">
          <h1>Sistem Pakar Rekomendasi Program Latihan</h1>
          <p>Metode Case Based Reasoning (CBR)</p>
        </div>
        <div className="tab-navigation">
          <Motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className={`tab-button ${activeTab === 'input' ? 'active' : ''}`} onClick={() => setActiveTab('input')}>
            <FaDumbbell /> Input Data
          </Motion.button>
          <Motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className={`tab-button ${activeTab === 'recommendation' ? 'active' : ''}`} onClick={() => setActiveTab('recommendation')} disabled={!recommendation}>
            <FaHeartbeat /> Hasil Rekomendasi
          </Motion.button>
          <Motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className={`tab-button ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
            <FaRunning /> Riwayat
          </Motion.button>
        </div>

        <div className="tab-content">
          <AnimatePresence mode="wait">
            {activeTab === 'input' && (
              <Motion.div key="input" className="tab-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <h2><FaDumbbell /> Masukkan Data Anda</h2>
                <Motion.form
                  onSubmit={handleSubmit}
                  className="input-form"
                  variants={formContainerVariants}
                  initial="initial"
                  animate="animate"
                >
                  <Motion.div className="form-group full-width" variants={formItemVariants}>
                    <label htmlFor="nama">Nama Lengkap</label>
                    <input type="text" id="nama" name="nama" value={formData.nama} onChange={handleInputChange} required />
                  </Motion.div>
                  <Motion.div className="form-group" variants={formItemVariants}><label htmlFor="usia">Usia</label><input type="number" id="usia" name="usia" value={formData.usia} onChange={handleInputChange} required min="15" max="80" /></Motion.div>
                  <Motion.div className="form-group" variants={formItemVariants}><label htmlFor="jenisKelamin">Jenis Kelamin</label><select id="jenisKelamin" name="jenisKelamin" value={formData.jenisKelamin} onChange={handleInputChange} required><option value="">Pilih Jenis Kelamin</option><option value="Pria">Pria</option><option value="Wanita">Wanita</option></select></Motion.div>
                  <Motion.div className="form-group" variants={formItemVariants}><label htmlFor="beratBadan">Berat Badan (kg)</label><input type="number" id="beratBadan" name="beratBadan" value={formData.beratBadan} onChange={handleInputChange} required min="30" max="200" step="0.1" /></Motion.div>
                  <Motion.div className="form-group" variants={formItemVariants}><label htmlFor="tinggiBadan">Tinggi Badan (cm)</label><input type="number" id="tinggiBadan" name="tinggiBadan" value={formData.tinggiBadan} onChange={handleInputChange} required min="100" max="250" /></Motion.div>
                  <Motion.div className="form-group" variants={formItemVariants}><label htmlFor="tujuanLatihan">Tujuan Latihan</label><select id="tujuanLatihan" name="tujuanLatihan" value={formData.tujuanLatihan} onChange={handleInputChange} required><option value="">Pilih Tujuan Latihan</option><option value="Penurunan Berat Badan">Penurunan Berat Badan</option><option value="Pembentukan Otot">Pembentukan Otot</option><option value="Peningkatan Stamina">Peningkatan Stamina</option></select></Motion.div>
                  <Motion.div className="form-group" variants={formItemVariants}><label htmlFor="frekuensiLatihan">Frekuensi Latihan per Minggu</label><select id="frekuensiLatihan" name="frekuensiLatihan" value={formData.frekuensiLatihan} onChange={handleInputChange} required><option value="">Pilih Frekuensi</option>{[...Array(7)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1} kali/minggu</option>)}</select></Motion.div>
                  <Motion.div className="submit-button-container" variants={formItemVariants}>
                    <Motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="submit-button" disabled={loading}>{loading ? 'Memproses...' : 'Dapatkan Rekomendasi'}</Motion.button>
                  </Motion.div>
                </Motion.form>
              </Motion.div>
            )}

            {activeTab === 'recommendation' && recommendation && (
              <Motion.div key="recommendation" className="tab-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <h2><FaHeartbeat /> Rekomendasi untuk {recommendation.nama}</h2>
                <div>
                  <div className="recommendation-result"><div className="recommendation-header"><p><strong>Tanggal:</strong> {recommendation.tanggal}</p><p><strong>ID Rekomendasi:</strong> #{recommendation.id}</p></div><div className="recommendation-body"><div className="recommendation-item"><h3>Jenis Latihan</h3><p>{recommendation.jenisLatihan}</p></div><div className="recommendation-item"><h3>Frekuensi</h3><p>{recommendation.frekuensi}</p></div><div className="recommendation-item"><h3>Durasi</h3><p>{recommendation.durasi}</p></div><div className="recommendation-item"><h3>Intensitas</h3><p>{recommendation.intensitas}</p></div><div className="recommendation-detail"><h3>Detail Program</h3><pre>{recommendation.detailProgram}</pre></div><div className="recommendation-notes"><h3>Catatan</h3><p>{recommendation.catatanKhusus}</p></div></div>
                    <Motion.button 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }} 
                        className="print-button" 
                        onClick={() => exportRecommendationToPDF(recommendation, `rekomendasi-${recommendation.nama}.pdf`)}>
                        Download Rekomendasi (PDF)
                    </Motion.button>
                  </div>
                </div>
              </Motion.div>
            )}

            {activeTab === 'history' && (
              <Motion.div key="history" className="tab-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <h2><FaRunning /> Riwayat Rekomendasi</h2>
                {history.length === 0 ? (<p className="no-data">Belum ada riwayat rekomendasi.</p>) : (<div className="history-list">{history.map((item, index) => (<Motion.div key={item.id} className="history-item" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}><div className="history-header"><p><strong>Nama:</strong> {item.nama}</p><p><strong>Tanggal:</strong> {item.tanggal}</p></div><div className="history-content"><p><strong>Jenis Latihan:</strong> {item.jenisLatihan}</p><p><strong>Frekuensi:</strong> {item.frekuensi}</p><p><strong>Durasi:</strong> {item.durasi}</p></div><Motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="view-button" onClick={() => { setRecommendation(item); setActiveTab('recommendation'); }}>Lihat Detail</Motion.button></Motion.div>))}</div>)}
              </Motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Motion.div>
  );
}

export default Home;
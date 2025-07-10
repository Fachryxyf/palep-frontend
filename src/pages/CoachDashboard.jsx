import React, { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import api from '../api'; // Import helper API kita
import '../styles/CoachDashboard.css';
import { FaShieldAlt, FaEdit } from 'react-icons/fa';
import EditModal from '../components/EditModal'; // Import modal

const CoachDashboard = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State baru untuk modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Gunakan 'api' yang sudah memiliki interceptor
        const response = await api.get('/rekomendasi');
        setHistory(response.data);
      } catch (err) {
        setError('Gagal memuat data riwayat.');
        console.error('Fetch history error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleOpenModal = (caseItem) => {
    setSelectedCase(caseItem);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCase(null);
  };

  const handleSave = (updatedCase) => {
    // Update data di list tanpa perlu fetch ulang
    setHistory(prevHistory => 
      prevHistory.map(item => item.id === updatedCase.id ? updatedCase : item)
    );
    handleCloseModal();
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1><FaShieldAlt /> Dashboard Pelatih</h1>
          <p>Revisi dan kelola rekomendasi yang dihasilkan sistem.</p>
        </div>

        {loading && <p>Memuat data...</p>}
        {error && <p className="error-message">{error}</p>}
        
        {!loading && !error && (
          <div className="history-list-coach">
            {history.map((item) => (
              <Motion.div
                key={item.id}
                className="history-item-coach"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="history-item-header">
                  <span><strong>ID:</strong> #{item.id} | <strong>Nama:</strong> {item.nama}</span>
                  <span><strong>Tanggal:</strong> {item.tanggal}</span>
                </div>
                <div className="history-item-body">
                  <p><strong>Input:</strong> Usia {item.usia}, BMI {item.bmi}, Tujuan: {item.tujuanLatihan}</p>
                  <p><strong>Solusi Sistem:</strong> {item.jenisLatihan} - {item.durasi}</p>
                </div>
                <div className="history-item-actions">
                  <button className="edit-button" onClick={() => handleOpenModal(item)}>
                    <FaEdit /> Revisi
                  </button>
                </div>
              </Motion.div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <EditModal 
          caseData={selectedCase}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default CoachDashboard;
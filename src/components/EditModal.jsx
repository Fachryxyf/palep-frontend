import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import api from '../api'; // Gunakan helper API kita
import '../styles/EditModal.css';

const EditModal = ({ caseData, onClose, onSave }) => {
  const [formData, setFormData] = useState(caseData);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(caseData); // Update form data saat caseData berubah
  }, [caseData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const response = await api.put(`/rekomendasi/${formData.id}`, {
        jenisLatihan: formData.jenisLatihan,
        frekuensi: formData.frekuensi,
        durasi: formData.durasi,
        intensitas: formData.intensitas,
        detailProgram: formData.detailProgram,
        catatanKhusus: formData.catatanKhusus,
      });
      onSave(response.data); // Kirim data yang sudah diupdate kembali ke parent
    } catch (error) {
      console.error('Failed to update case:', error);
      alert('Gagal menyimpan perubahan.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!caseData) return null;

  return (
    <AnimatePresence>
      <Motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Motion.div
          className="modal-content"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
        >
          <h3>Revisi Rekomendasi #{formData.id}</h3>
          <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-group">
              <label>Jenis Latihan</label>
              <input type="text" name="jenisLatihan" value={formData.jenisLatihan} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Frekuensi</label>
              <input type="text" name="frekuensi" value={formData.frekuensi} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Durasi</label>
              <input type="text" name="durasi" value={formData.durasi} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Intensitas</label>
              <input type="text" name="intensitas" value={formData.intensitas} onChange={handleChange} />
            </div>
            <div className="form-group full-width">
              <label>Detail Program</label>
              <textarea name="detailProgram" value={formData.detailProgram} onChange={handleChange} rows="5"></textarea>
            </div>
            <div className="form-group full-width">
              <label>Catatan Khusus</label>
              <textarea name="catatanKhusus" value={formData.catatanKhusus} onChange={handleChange} rows="3"></textarea>
            </div>
            <div className="modal-actions">
              <button type="button" onClick={onClose} className="cancel-button">Batal</button>
              <button type="submit" className="save-button" disabled={isSaving}>
                {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </Motion.div>
      </Motion.div>
    </AnimatePresence>
  );
};

export default EditModal;
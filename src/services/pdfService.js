import jsPDF from 'jspdf';
import logo from '../assets/logo-gym.png'; // Impor logo Anda

/**
 * Membuat dokumen PDF rekomendasi secara programatik dengan jsPDF.
 * @param {object} recommendation - Objek data rekomendasi.
 * @param {string} fileName - Nama file PDF yang akan diunduh.
 */
export const exportRecommendationToPDF = (recommendation, fileName) => {
  if (!recommendation) {
    console.error("Data rekomendasi tidak tersedia untuk ekspor PDF.");
    return;
  }

  const pdf = new jsPDF('p', 'mm', 'a4');

  // --- Variabel untuk layout ---
  const page_width = pdf.internal.pageSize.getWidth();
  const page_height = pdf.internal.pageSize.getHeight();
  const margin = 15;
  let cursorY = 20;

  // ====================================
  // === BAGIAN: WATERMARK DI TENGAH  ===
  // ====================================
  const watermark_size = 100;
  const watermark_x = (page_width - watermark_size) / 2;
  const watermark_y = (page_height - watermark_size) / 2;
  pdf.setGState(new pdf.GState({opacity: 0.050})); 
  pdf.addImage(logo, 'PNG', watermark_x, watermark_y, watermark_size, watermark_size);
  pdf.setGState(new pdf.GState({opacity: 1})); 

  // ===================================
  // === BAGIAN 1: KOP SURAT (HEADER) ===
  // ===================================
  
  const page_center = page_width / 2;
  const logo_width = 30;
  const logo_height = 30;
  const logo_x = page_center - (logo_width / 2);
  pdf.addImage(logo, 'PNG', logo_x, 15, logo_width, logo_height);
  cursorY = 15 + logo_height + 8;
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(16);
  pdf.text('FIT3GYM JAKARTA TIMUR', page_center, cursorY, { align: 'center' });
  cursorY += 7;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.text('Jl. H. Hasan No.36, RT.2/RW.9, Baru, Kec. Ps. Rebo,', page_center, cursorY, { align: 'center' });
  cursorY += 5;
  pdf.text('Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13780', page_center, cursorY, { align: 'center' });
  cursorY += 5;
  pdf.text('No. HP: 0877-8084-9281 | Instagram: @Fit3_Gym', page_center, cursorY, { align: 'center' });
  cursorY += 5;
  pdf.setLineWidth(0.5);
  pdf.line(margin, cursorY, page_width - margin, cursorY);
  const mainContentStartY = cursorY + 10;
  cursorY = mainContentStartY; 

  // ======================================
  // === BAGIAN 2: JUDUL & INFO UTAMA   ===
  // ======================================
  
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.text('Program Latihan Personal', page_width / 2, cursorY, { align: 'center' });
  cursorY += 10;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'italic');
  pdf.setFontSize(12);
  const bulanPeriode = new Date(recommendation.tanggal)
    .toLocaleString('id-ID', { month: 'long' });
  pdf.text(`Periode: ${bulanPeriode}`, page_width / 2, cursorY, { align: 'center' });
  cursorY += 10;
  pdf.text(`Nama Pengguna: ${recommendation.nama}`, margin, cursorY);
  pdf.text(`Tanggal: ${new Date(recommendation.tanggal).toLocaleDateString('id-ID')}`, page_width - margin, cursorY, { align: 'right' });
  cursorY += 10;

  // ======================================
  // === BAGIAN 3: DETAIL REKOMENDASI   ===
  // ======================================

  // Fungsi helper untuk menggambar bagian
  const drawSection = (title, content, isLongText = false) => {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.text(title, margin, cursorY);
    cursorY += 6;
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);
    
    if(isLongText) {
      // Mengatasi text wrapping untuk teks panjang
      const splitText = pdf.splitTextToSize(content, page_width - margin * 2);
      pdf.text(splitText, margin, cursorY);
      cursorY += (splitText.length * 5) + 5; // Tambahkan spasi ekstra berdasarkan jumlah baris
    } else {
      pdf.text(content, margin, cursorY);
      cursorY += 10;
    }
  };

  drawSection('Jenis Latihan', recommendation.jenisLatihan);
  drawSection('Frekuensi', recommendation.frekuensi);
  drawSection('Durasi', recommendation.durasi);
  drawSection('Intensitas', recommendation.intensitas);
  
  pdf.setLineWidth(0.2);
  pdf.line(margin, cursorY - 4, page_width - margin, cursorY - 4);

  // Menggunakan helper untuk teks panjang
  drawSection('Detail Program:', recommendation.detailProgram, true);
  drawSection('Catatan Khusus:', recommendation.catatanKhusus, true);


    // ============================
  // === BAGIAN 4: TANDA TANGAN ===
  // ==============================
  
  // Beri sedikit ruang setelah konten terakhir
  cursorY += 20;

  // Pastikan tidak terlalu ke bawah, jika perlu tambahkan halaman baru (opsional)
  if (cursorY > page_height - 60) {
      pdf.addPage();
      cursorY = 20;
  }

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Hormat kami,', page_width - margin, cursorY, { align: 'right' });
  cursorY += 25; // Spasi untuk tanda tangan

  pdf.setLineWidth(0.3);
  pdf.line(page_width - margin - 50, cursorY, page_width - margin, cursorY); // Garis tanda tangan
  
  pdf.setFont('helvetica', 'bold');
  pdf.text('Instruktur Kepala', page_width - margin, cursorY + 5, { align: 'right' });
  
  pdf.setFont('helvetica', 'normal');
  pdf.text('Fit3Gym Jakarta Timur', page_width - margin, cursorY + 10, { align: 'right' });


  // ========================
  // === BAGIAN 5: FOOTER ===
  // ========================
  
  const footerY = page_height - 15;
  pdf.setLineWidth(0.5);
  pdf.line(margin, footerY - 5, page_width - margin, footerY - 5); // Garis di atas footer
  
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'italic');
  const footerText = 'Dokumen ini dibuat secara otomatis oleh Sistem Rekomendasi Latihan Fit3Gym Jakarta Timur.';
  pdf.text(footerText, page_width / 2, footerY, { align: 'center' });


  // ============================
  // === BAGIAN 6: SIMPAN PDF ===
  // ============================
  pdf.save(fileName || `rekomendasi.pdf`);
};
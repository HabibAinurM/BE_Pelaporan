const Laporan = require("../models/Laporan");

// Buat laporan baru
// Helper function untuk mengkonversi string kosong menjadi null
const cleanFormData = (data) => {
  const cleaned = {};
  for (const [key, value] of Object.entries(data)) {
    // Konversi string kosong menjadi null
    if (value === '' || value === undefined) {
      cleaned[key] = null;
    } else {
      cleaned[key] = value;
    }
  }
  return cleaned;
};

// POST /api/laporan
exports.createLaporan = async (req, res) => {
  try {
    console.log("BODY DITERIMA:", req.body);
    
    // Ambil userId dari token yang sudah terverifikasi
    const userId = req.user.id; // pastikan middleware auth sudah set req.user
    
    // Bersihkan data (konversi string kosong ke null)
    const cleanedData = cleanFormData(req.body);
    
    // Tambahkan userId
    cleanedData.userId = userId;
    
    console.log("DATA SETELAH DIBERSIHKAN:", cleanedData);
    
    // Simpan ke database
    const laporan = await Laporan.create(cleanedData);
    
    console.log("LAPORAN BERHASIL DISIMPAN:", laporan.toJSON());
    
    return res.status(201).json({
      success: true,
      message: "Laporan berhasil dibuat",
      data: laporan
    });
    
  } catch (error) {
    console.error("ERROR SAAT MENYIMPAN LAPORAN:", error);
    return res.status(500).json({
      success: false,
      message: "Gagal menyimpan laporan",
      error: error.message
    });
  }
};


// Ambil semua laporan
exports.getAllLaporan = async (req, res) => {
  try {
    let laporan;
    if (req.user.role === "admin") {
      laporan = await Laporan.findAll({ include: ["User"] });
    } else {
      laporan = await Laporan.findAll({ where: { userId: req.user.id } });
    }
    res.json({ laporan });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
  }
};

// Ambil laporan by ID
exports.getLaporanById = async (req, res) => {
  try {
    const laporan = await Laporan.findByPk(req.params.id);
    if (!laporan) return res.status(404).json({ message: "Laporan tidak ditemukan" });

    if (req.user.role !== "admin" && laporan.userId !== req.user.id) {
      return res.status(403).json({ message: "Akses ditolak" });
    }

    res.json({ laporan });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
  }
};

// Update laporan
exports.updateLaporan = async (req, res) => {
  try {
    const laporan = await Laporan.findByPk(req.params.id);
    if (!laporan) return res.status(404).json({ message: "Laporan tidak ditemukan" });

    if (req.user.role !== "admin" && laporan.userId !== req.user.id) {
      return res.status(403).json({ message: "Akses ditolak" });
    }

    await laporan.update(req.body);
    res.json({ message: "Laporan diperbarui", laporan });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
  }
};

// Delete laporan
exports.deleteLaporan = async (req, res) => {
  try {
    const laporan = await Laporan.findByPk(req.params.id);
    if (!laporan) return res.status(404).json({ message: "Laporan tidak ditemukan" });

    if (req.user.role !== "admin" && laporan.userId !== req.user.id) {
      return res.status(403).json({ message: "Akses ditolak" });
    }

    await laporan.destroy();
    res.json({ message: "Laporan dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
  }
};

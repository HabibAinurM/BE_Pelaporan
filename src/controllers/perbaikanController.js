const Perbaikan = require("../models/Perbaikan"); // HANYA SEKALI
const Laporan = require("../models/Laporan");
const User = require("../models/User");

// Hapus: const Perbaikan = require('../models/Perbaikan'); 
// Baris ini yang menyebabkan error

// Tambah perbaikan baru
exports.createPerbaikan = async (req, res) => {
  try {
    // Pastikan req.user.id sudah tersedia dari authMiddleware
    const { laporanId, jenisPerbaikan, detail } = req.body;
    const userId = req.user.id; // ambil dari token login

    const laporan = await Laporan.findByPk(laporanId);
    if (!laporan) {
      return res.status(404).json({ message: "Laporan tidak ditemukan" });
    }

    const perbaikan = await Perbaikan.create({
      laporanId,
      userId,
      jenisPerbaikan,
      detail
    });

    res.status(201).json({ message: "Perbaikan berhasil ditambahkan", perbaikan });
  } catch (error) {
    console.error("Error creating perbaikan:", error);
    res.status(500).json({ message: "Gagal menambahkan perbaikan", error: error.message });
  }
};

// Lihat semua perbaikan
exports.getPerbaikans = async (req, res) => {
  try {
    const perbaikans = await Perbaikan.findAll({
      // Pastikan 'user' dan 'laporan' sudah didefinisikan sebagai alias di model
      include: [
        { model: User, as: "user", attributes: ["id", "username", "email"] }, // Menggunakan 'username' alih-alih 'name' jika User model hanya punya 'username'
        { model: Laporan, as: "laporan", attributes: ["id", "garduInduk", "penyulang"] } // Mengambil atribut yang relevan dari Laporan
      ]
    });
    res.json(perbaikans);
  } catch (error) {
    console.error("Error getting perbaikans:", error);
    res.status(500).json({ message: "Gagal mengambil data perbaikan", error: error.message });
  }
};

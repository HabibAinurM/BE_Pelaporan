const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const laporanController = require("../controllers/laporanController");

// Buat laporan baru
router.post("/", authMiddleware, laporanController.createLaporan);

// Ambil semua laporan
router.get("/", authMiddleware, laporanController.getAllLaporan);

// Ambil laporan berdasarkan ID
router.get("/:id", authMiddleware, laporanController.getLaporanById);

// Update laporan
router.put("/:id", authMiddleware, laporanController.updateLaporan);

// Hapus laporan
router.delete("/:id", authMiddleware, laporanController.deleteLaporan);

module.exports = router;

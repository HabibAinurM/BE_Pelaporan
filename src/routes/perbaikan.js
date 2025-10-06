const express = require('express');
const router = express.Router();
const perbaikanController = require ("../controllers/perbaikanController");
const { authMiddleware } = require("../middleware/authMiddleware");
// Buat perbaikan baru
router.post("/", authMiddleware, perbaikanController.createPerbaikan);

// Ambil semua perbaikan
router.get("/", authMiddleware, perbaikanController.getPerbaikans);

module.exports = router;

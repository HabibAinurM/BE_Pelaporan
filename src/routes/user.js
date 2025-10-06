const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

// hanya user yang login bisa akses
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Ini halaman profile user", user: req.user });
});

// hanya admin bisa akses
router.get("/admin", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: "Ini halaman khusus admin" });
});

module.exports = router;

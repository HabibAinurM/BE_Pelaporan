const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const laporanController = require("../controllers/laporanController");

router.post("/", authMiddleware, laporanController.createLaporan);
router.get("/", authMiddleware, laporanController.getAllLaporan);
router.get("/:id", authMiddleware, laporanController.getLaporanById);
router.put("/:id", authMiddleware, laporanController.updateLaporan);
router.delete("/:id", authMiddleware, laporanController.deleteLaporan);

module.exports = router;

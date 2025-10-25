const express = require("express");
const router = express.Router();
const hasilTestJaringanController = require("../controllers/hasilTestJaringanController");
const { authMiddleware } = require("../middleware/authMiddleware");
const multer = require("multer");

// Setup Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // pastikan folder 'uploads/' sudah ada
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const originalName = file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueSuffix + "_" + originalName);
  },
});
const upload = multer({ storage });

// Routes
router.post(
  "/", 
  authMiddleware, 
  upload.array("lampiranFoto", 5), // max 5 file
  hasilTestJaringanController.createHasilTestJaringan
);

router.get("/", authMiddleware, hasilTestJaringanController.getAllHasilTestJaringan);
router.get("/:id", authMiddleware, hasilTestJaringanController.getHasilTestJaringanById);

router.put(
  "/:id", 
  authMiddleware, 
  upload.array("lampiranFoto", 5), // jika ingin update foto
  hasilTestJaringanController.updateHasilTestJaringan
);

router.delete("/:id", authMiddleware, hasilTestJaringanController.deleteHasilTestJaringan);

module.exports = router;

// routes/uploadRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { authMiddleware } = require("../middleware/authMiddleware");

// pastikan folder ada
const uploadDir = path.join(__dirname, "..", "uploads", "test-jaringan");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random()*1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  }
});

const upload = multer({ storage });

router.post("/", authMiddleware, upload.array("files", 20), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    const files = req.files.map(f => ({
      filename: f.filename,
      path: `/uploads/test-jaringan/${f.filename}`,
      originalname: f.originalname,
      size: f.size
    }));
    return res.status(200).json({ message: "Upload success", files });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

module.exports = router;

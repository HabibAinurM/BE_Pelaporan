// controllers/uploadController.js
const path = require("path");
const fs = require("fs");

exports.uploadPhotos = (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }
    const filesInfo = req.files.map(f => {
      // Return path that frontend can use, misal /uploads/...
      return { filename: f.filename, path: `/uploads/${f.filename}`, originalname: f.originalname };
    });
    res.status(200).json({ message: "Upload success", files: filesInfo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
}

const jwt = require("jsonwebtoken");
const User = require("../models/User");

// cek login
exports.authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token tidak ditemukan" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(403).json({ message: "Token tidak valid" });
  }
};

// cek admin
exports.adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Akses ditolak, hanya admin" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
  }
};

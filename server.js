require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

// Database
const sequelize = require("./src/config/db");

// Routes
const authRoutes = require("./src/routes/auth");
const laporanRoutes = require("./src/routes/laporan");
const pemeriksaanRoutes = require("./src/routes/pemeriksaan");
const hasilTestJaringanRoutes = require("./src/routes/hasiltestjaringan");
const perbaikanRoutes = require("./src/routes/perbaikan");
const uploadRoutes = require("./src/routes/uploadRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();

/* =========================
   ✅ MIDDLEWARE GLOBAL
   ========================= */

// ✅ Perbaikan CORS (frontend di 5173)
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// (Opsional) akses file upload via URL
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =========================
   ✅ ROUTES
   ========================= */
app.use("/api/auth", authRoutes);
app.use("/api/laporan", laporanRoutes);
app.use("/api/pemeriksaan", pemeriksaanRoutes);
app.use("/api/test-jaringan", hasilTestJaringanRoutes);
app.use("/api/perbaikan", perbaikanRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", userRoutes);

/* =========================
   ✅ DEFAULT ROUTE (CEK API)
   ========================= */
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

/* =========================
   ✅ SYNC DATABASE
   ========================= */
sequelize.sync()
  .then(() => console.log("✅ Database connected"))
  .catch(err => {
    console.error("❌ Database connection failed:");
    console.error(err);
  });

/* =========================
   ✅ START SERVER
   ========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

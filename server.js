require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("./src/config/db");
const authRoutes = require("./src/routes/auth");
const laporanRoutes = require("./src/routes/laporan");
const pemeriksaanRoutes = require('./src/routes/pemeriksaan');
const hasilTestJaringanRoutes = require("./src/routes/hasiltestjaringan");
const perbaikanRoutes = require("./src/routes/perbaikan")
//const perbaikanRoutes = require("./src/routes/perbaikan");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/laporan", laporanRoutes);
app.use('/api/pemeriksaan', pemeriksaanRoutes);
app.use("/api/test-jaringan", hasilTestJaringanRoutes);
app.use("/api/perbaikan", perbaikanRoutes);
//app.use("/api/perbaikan", perbaikanRoutes);


// Sync Database
sequelize.sync()
//sequelize.sync({ alter: true })
  .then(() => console.log("Database connected"))
  .catch(err => console.error("Database connection failed:", err)); // Tambahkan penanganan kesalahan

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));


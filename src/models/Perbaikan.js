const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Laporan = require("./Laporan");

const Perbaikan = sequelize.define(
  "Perbaikan",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    jenisPerbaikan: {
      type: DataTypes.ENUM("ganti_baru", "trafo_mobile", "kopel_trafo_sebelah"),
      allowNull: false,
    },
    detail: {
      type: DataTypes.STRING, // untuk menyimpan pilihan detail (misal KVA / opsi kopel)
      allowNull: true,
    },
  },
  {
    tableName: "Perbaikan", // ✅ letakkan di sini & camelCase
    timestamps: true,       // opsional, kalau mau createdAt & updatedAt
  }
);

// Relasi dengan User (siapa yang memperbaiki)
Perbaikan.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Perbaikan, { foreignKey: "userId", as: "perbaikans" });

// Relasi dengan Laporan (laporan mana yang diperbaiki)
Perbaikan.belongsTo(Laporan, { foreignKey: "laporanId", as: "laporan" });
Laporan.hasMany(Perbaikan, { foreignKey: "laporanId", as: "perbaikans" });

module.exports = Perbaikan;

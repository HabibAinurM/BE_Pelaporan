const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Laporan = require("./Laporan");

const Perbaikan = sequelize.define("Perbaikan", {
  laporan_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  jenis_perbaikan: {
    type: DataTypes.ENUM("gantiTrafo", "gantiTrafoMobile", "kopelTrafoSebelah"),
    allowNull: false,
  },
  kapasitas: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  daftar_trafo: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  tanggal_input: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Perbaikan.belongsTo(Laporan, { foreignKey: "laporan_id" });
Laporan.hasOne(Perbaikan, { foreignKey: "laporan_id" });

module.exports = Perbaikan;

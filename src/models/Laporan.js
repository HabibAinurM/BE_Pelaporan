const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Laporan = sequelize.define("Laporan", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // Data Gardu
  garduInduk: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  penyulang: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  nomorGTT: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  alamat: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  
  // Data Trafo
  merk: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  daya: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  nomorSerie: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  fasa: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  teganganPrimer: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  teganganSekunder: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  arusPrimer: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  arusSekunder: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  impedensi: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  tahun: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  tapTrafo: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  teganganTap: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  konstruksiTrafo: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  hubunganBelitan: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  trafoEk: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  namaBengkel: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  tanggalOperasi: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
  platPemeriksaanMinyak: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  
  // Data Kerusakan
  tanggalKerusakan: { type: DataTypes.DATE, allowNull: true, defaultValue: null },
  tangkiRusak: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  bushingTM: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  bushingTR: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  tapCharger: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  minyakTrafo: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  stopKran: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  
  // Penahanan
  titikNetral: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  lightningArrester: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  
  // Pembatas Trafo
  pengamanPrimerPhasaR: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  pengamanPrimerPhasaS: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  pengamanPrimerPhasaT: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  pengamanSkunderPhasaR: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  pengamanSkunderPhasaS: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  pengamanSkunderPhasaT: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  pengamanSkunderAPhasaR: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  pengamanSkunderAPhasaS: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  pengamanSkunderAPhasaT: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  pengamanSkunderBPhasaR: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  pengamanSkunderBPhasaS: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  pengamanSkunderBPhasaT: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  pengamanSkunderCPhasaR: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  pengamanSkunderCPhasaS: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  pengamanSkunderCPhasaT: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  pengamanSkunderDPhasaR: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  pengamanSkunderDPhasaS: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  pengamanSkunderDPhasaT: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  merkSaklarUtama: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  arusNominalSaklarUtama: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  jenisKabel: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  penampangIncoming: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  penampangOutgoing: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  
  // Lainnya
  keterangan: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
  Latitude: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  Longitude: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  foto1: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  foto2: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  foto3: { type: DataTypes.STRING, allowNull: true, defaultValue: null }
}, {
  tableName: "laporan",
  timestamps: true
});

// Relasi: user 1-n laporan
User.hasMany(Laporan, { foreignKey: "userId" });
Laporan.belongsTo(User, { foreignKey: "userId" });

module.exports = Laporan;
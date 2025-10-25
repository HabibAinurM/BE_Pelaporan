const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const PemeriksaanJaringan = sequelize.define('PemeriksaanJaringan', {
  no_ba: { type: DataTypes.STRING, allowNull: false },
  pln_area: DataTypes.STRING,
  nama_pekerjaan: DataTypes.STRING,
  nama_pelanggan: DataTypes.STRING,
  alamat_lokasi: DataTypes.TEXT,
  rayon: DataTypes.STRING,
  tanggal: DataTypes.DATE,
  spk_sutm: DataTypes.STRING,
  spk_sutr: DataTypes.STRING,
  spk_gtt: DataTypes.STRING,
  tanggal: DataTypes.DATE,
  sutm_as3c: DataTypes.STRING,
  sutr_bund_conductor: DataTypes.STRING,
  trafo_3ph: DataTypes.STRING,

  // petugas
  petugas1: DataTypes.STRING,
  petugas2: DataTypes.STRING,
  petugas3: DataTypes.STRING,
  petugas4: DataTypes.STRING,
  petugas5: DataTypes.STRING,

  // foto dokumentasi
  foto1: DataTypes.STRING,
  foto2: DataTypes.STRING,
  foto3: DataTypes.STRING
}, {
  tableName: 'pemeriksaan_jaringan'
});

// Relasi
User.hasMany(PemeriksaanJaringan, { foreignKey: 'userId' });
PemeriksaanJaringan.belongsTo(User, { foreignKey: 'userId' });

module.exports = PemeriksaanJaringan;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const HasilTestJaringan = sequelize.define("HasilTestJaringan", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Data Induk
  pln_up3: DataTypes.STRING(50),
  nama_pekerjaan: DataTypes.STRING(150),
  nama_pelanggan: DataTypes.STRING(150),
  lokasi: DataTypes.TEXT, // Lokasi bisa panjang, TEXT lebih aman
  ULP: DataTypes.STRING(50),
  gardu_induk: DataTypes.STRING(100),
  tanggal_test: DataTypes.DATEONLY, // Hanya tanggal, lebih efisien
  tanggal_oprasi: DataTypes.DATEONLY, // Hanya tanggal, lebih efisien
  pelaksana: DataTypes.STRING(100),
  spk_sutm: DataTypes.STRING(100),
  spk_sutr: DataTypes.STRING(100),
  spk_gtt: DataTypes.STRING(100),
  penyulang: DataTypes.STRING(100),
  no_gtt: DataTypes.STRING(100),

  // Jaringan SUTR - Jurusan 1 (dan 2, 3) - Menggunakan tipe data numerik
  sutrJenisConductor1: DataTypes.STRING(50),
  sutrUkuran1: DataTypes.FLOAT,
  sutrPanjang1: DataTypes.FLOAT,
  sutrJenisLine1: DataTypes.STRING(50),
  sutrRN1: DataTypes.FLOAT,
  sutrSN1: DataTypes.FLOAT,
  sutrTN1: DataTypes.FLOAT,
  sutrRS1: DataTypes.FLOAT,
  sutrRT1: DataTypes.FLOAT,
  sutrST1: DataTypes.FLOAT,
  sutrNBody1: DataTypes.FLOAT,

  // Jaringan SUTR - Jurusan 2
  sutrJenisConductor2: DataTypes.STRING(50),
  sutrUkuran2: DataTypes.FLOAT,
  sutrPanjang2: DataTypes.FLOAT,
  sutrJenisLine2: DataTypes.STRING(50),
  sutrRN2: DataTypes.FLOAT,
  sutrSN2: DataTypes.FLOAT,
  sutrTN2: DataTypes.FLOAT,
  sutrRS2: DataTypes.FLOAT,
  sutrRT2: DataTypes.FLOAT,
  sutrST2: DataTypes.FLOAT,
  sutrNBody2: DataTypes.FLOAT,

  // Jaringan SUTR - Jurusan 3
  sutrJenisConductor3: DataTypes.STRING(50),
  sutrUkuran3: DataTypes.FLOAT,
  sutrPanjang3: DataTypes.FLOAT,
  sutrJenisLine3: DataTypes.STRING(50),
  sutrRN3: DataTypes.FLOAT,
  sutrSN3: DataTypes.FLOAT,
  sutrTN3: DataTypes.FLOAT,
  sutrRS3: DataTypes.FLOAT,
  sutrRT3: DataTypes.FLOAT,
  sutrST3: DataTypes.FLOAT,
  sutrNBody3: DataTypes.FLOAT,

  // Jaringan SUTM
  sutmJenisConductor: DataTypes.STRING(50),
  sutmUkuran: DataTypes.FLOAT,
  sutmPanjang: DataTypes.FLOAT,
  sutmRG: DataTypes.FLOAT,
  sutmSG: DataTypes.FLOAT,
  sutmTG: DataTypes.FLOAT,
  sutmRS: DataTypes.FLOAT,
  sutmRT: DataTypes.FLOAT,
  sutmST: DataTypes.FLOAT,

  // Transfomator
  putaranPhasa: DataTypes.STRING(50),
  pabrikMerk: DataTypes.STRING(100),
  dayaNominal: DataTypes.FLOAT,
  noSeri: DataTypes.STRING(100),
  hubungan: DataTypes.STRING(50),
  tegHubSingkat: DataTypes.FLOAT,
  tegPrimer: DataTypes.FLOAT,
  tegSekunder: DataTypes.FLOAT,
  arusPrimer: DataTypes.FLOAT,
  arusNom: DataTypes.FLOAT,
  frekuensi: DataTypes.FLOAT,
  tahunPembuatan: DataTypes.STRING(10),
  pendinginMinyak: DataTypes.STRING(50),
  beratMinyak: DataTypes.FLOAT,
  beratTotal: DataTypes.FLOAT,
  posSadapan: DataTypes.FLOAT,

  // Tahanan Isolasi Transformator
  tahananPrimerBody: DataTypes.FLOAT,
  tahananSekunderBody: DataTypes.FLOAT,
  tahananPrimerPrimer: DataTypes.FLOAT,
  tahananSekunderSekunder: DataTypes.FLOAT,

  // Tegangan rendah
  teganganRN: DataTypes.FLOAT,
  teganganSN: DataTypes.FLOAT,
  teganganTN: DataTypes.FLOAT,
  teganganRS: DataTypes.FLOAT,
  teganganRT: DataTypes.FLOAT,
  teganganST: DataTypes.FLOAT,

  // Tahanan Isolasi Arrester & Pentanahan
  tahananArresterRG: DataTypes.FLOAT,
  tahananArresterSG: DataTypes.FLOAT,
  tahananArresterTG: DataTypes.FLOAT,
  pentanahanNetral: DataTypes.FLOAT,
  pentanahanArusBocorNetral: DataTypes.FLOAT,
  pentanahanArrester: DataTypes.FLOAT,
  pentanahanArusBocorArrester: DataTypes.FLOAT,

  // Catatan dan Petugas
  catatan: DataTypes.TEXT, // Catatan adalah kandidat terbaik untuk TEXT
  petugasPLN: DataTypes.STRING(100),
  pelaksanaPetugas: DataTypes.STRING(100),

}, {
  tableName: "Hasil_Oprasian_Jaringan",
});

// Relasi: user 1-n laporan
User.hasMany(HasilTestJaringan, { foreignKey: "userId" });
HasilTestJaringan.belongsTo(User, { foreignKey: "userId" });

module.exports = HasilTestJaringan;
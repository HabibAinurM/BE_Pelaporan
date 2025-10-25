// models/HasilTestJaringan.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const HasilTestJaringan = sequelize.define("HasilTestJaringan", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },

  // Data Umum
  plnUp3: DataTypes.STRING,
  namaPekerjaan: DataTypes.STRING,
  namaPelanggan: DataTypes.STRING,
  lokasiAlamat: DataTypes.TEXT,
  ulp: DataTypes.STRING,
  garduInduk: DataTypes.STRING,
  tanggalTest: DataTypes.DATEONLY,
  tanggalOperasi: DataTypes.DATEONLY,
  pelaksana: DataTypes.STRING,
  spkSutm: DataTypes.STRING,
  spkSutr: DataTypes.STRING,
  spkGtt: DataTypes.STRING,
  penyulang: DataTypes.STRING,
  noGtt: DataTypes.STRING,

  // Jaringan SUTR
  sutrJenisLine1: DataTypes.STRING,
  sutrJenisConductor1: DataTypes.STRING,
  sutrUkuran1: DataTypes.FLOAT,
  sutrPanjang1: DataTypes.FLOAT,
  sutrRN1: DataTypes.FLOAT,
  sutrSN1: DataTypes.FLOAT,
  sutrTN1: DataTypes.FLOAT,
  sutrRS1: DataTypes.FLOAT,
  sutrRT1: DataTypes.FLOAT,
  sutrST1: DataTypes.FLOAT,
  sutrNBody1: DataTypes.FLOAT,

  sutrJenisConductor2: DataTypes.STRING,
  sutrUkuran2: DataTypes.FLOAT,
  sutrPanjang2: DataTypes.FLOAT,
  sutrRN2: DataTypes.FLOAT,
  sutrSN2: DataTypes.FLOAT,
  sutrTN2: DataTypes.FLOAT,
  sutrRS2: DataTypes.FLOAT,
  sutrRT2: DataTypes.FLOAT,
  sutrST2: DataTypes.FLOAT,
  sutrNBody2: DataTypes.FLOAT,

  sutrJenisConductor3: DataTypes.STRING,
  sutrUkuran3: DataTypes.FLOAT,
  sutrPanjang3: DataTypes.FLOAT,
  sutrRN3: DataTypes.FLOAT,
  sutrSN3: DataTypes.FLOAT,
  sutrTN3: DataTypes.FLOAT,
  sutrRS3: DataTypes.FLOAT,
  sutrRT3: DataTypes.FLOAT,
  sutrST3: DataTypes.FLOAT,
  sutrNBody3: DataTypes.FLOAT,

  // Jaringan SUTM
  sutmJenisConductor: DataTypes.STRING,
  sutmUkuran: DataTypes.FLOAT,
  sutmPanjang: DataTypes.FLOAT,
  sutmRG: DataTypes.FLOAT,
  sutmSG: DataTypes.FLOAT,
  sutmTG: DataTypes.FLOAT,
  sutmRS: DataTypes.FLOAT,
  sutmRT: DataTypes.FLOAT,
  sutmST: DataTypes.FLOAT,

  // Transformator
  putaranPhasa: DataTypes.STRING,
  pabrikMerk: DataTypes.STRING,
  dayaNominal: DataTypes.FLOAT,
  noSeri: DataTypes.STRING,
  hubungan: DataTypes.STRING,
  tegHubSingkat: DataTypes.FLOAT,
  tegPrimer: DataTypes.FLOAT,
  tegSekunder: DataTypes.FLOAT,
  arusPrimer: DataTypes.FLOAT,
  arusNom: DataTypes.FLOAT,
  frekuensi: DataTypes.FLOAT,
  tahunPembuatan: DataTypes.STRING,
  pendinginMinyak: DataTypes.STRING,
  beratMinyak: DataTypes.FLOAT,
  beratTotal: DataTypes.FLOAT,
  posSadapan: DataTypes.FLOAT,

  // Tahanan Isolasi & Tegangan Rendah
  tahananPrimerBody: DataTypes.FLOAT,
  tahananSekunderBody: DataTypes.FLOAT,
  tahananPrimerPrimer: DataTypes.FLOAT,
  tahananSekunderSekunder: DataTypes.FLOAT,
  teganganRN: DataTypes.FLOAT,
  teganganSN: DataTypes.FLOAT,
  teganganTN: DataTypes.FLOAT,
  teganganRS: DataTypes.FLOAT,
  teganganRT: DataTypes.FLOAT,
  teganganST: DataTypes.FLOAT,

  // Arrester & Pentanahan
  tahananArresterRG: DataTypes.FLOAT,
  tahananArresterSG: DataTypes.FLOAT,
  tahananArresterTG: DataTypes.FLOAT,
  pentanahanNetral: DataTypes.FLOAT,
  pentanahanArusBocorNetral: DataTypes.FLOAT,
  pentanahanArrester: DataTypes.FLOAT,
  pentanahanArusBocorArrester: DataTypes.FLOAT,
  pentanahanBody: DataTypes.FLOAT,

  // Catatan & Petugas
  catatan: DataTypes.TEXT,
  petugasPLN: {
    type: DataTypes.JSON, // simpan array ["Petugas 1", "Petugas 2"]
    defaultValue: [],
  },
  pelaksanaPetugas: DataTypes.STRING,
  
  //lampiranFoto: {
    //type: DataTypes.JSON, // simpan array ["url1", "url2"]
    //defaultValue: [],
  //},

});

HasilTestJaringan.belongsTo(User, { foreignKey: "userId" });

module.exports = HasilTestJaringan;

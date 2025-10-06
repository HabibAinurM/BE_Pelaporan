const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const HasilTestJaringan = sequelize.define("HasilTestJaringan", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull:false
  },
  pln_up3:DataTypes.STRING,
  nama_pekerjaan:DataTypes.STRING,
  nama_pelanggan:DataTypes.STRING,
  lokasi:DataTypes.STRING,
  ULP:DataTypes.STRING,
  gardu_induk:DataTypes.STRING,
  tanggal_test:DataTypes.DATE,
  tanggal_oprasi:DataTypes.DATE,
  pelaksana:DataTypes.STRING,
  spk_sutm:DataTypes.STRING,
  spk_sutr:DataTypes.STRING,
  spk_gtt:DataTypes.STRING,
  penyulang:DataTypes.STRING,
  no_gtt:DataTypes.STRING
}, {
    tableName:"HasilTestJaringan"
});

// Relasi: user 1-n laporan
User.hasMany(HasilTestJaringan, { foreignKey: "userId" });
HasilTestJaringan.belongsTo(User, { foreignKey: "userId" });

module.exports = HasilTestJaringan;

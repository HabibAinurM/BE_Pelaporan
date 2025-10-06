const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    // TAMBAHKAN ATAU UBAH BARIS INI:
    port: process.env.DB_PORT, 
    // Jika Anda TIDAK menggunakan .env, Anda bisa menuliskannya langsung: port: 8111
     timezone: "+07:00",
  }
);

// PENTING: Anda mungkin perlu menambahkan fungsi untuk menguji koneksi:
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Koneksi Sequelize ke database berhasil.');
  } catch (error) {
    console.error('Gagal terhubung ke database:', error.message);
  }
}
testConnection();

module.exports = sequelize;
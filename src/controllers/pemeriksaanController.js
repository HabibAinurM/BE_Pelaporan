const PemeriksaanJaringan = require('../models/PemeriksaanJaringan');
const User = require('../models/User');

// controllers/pemeriksaanController.js
const Pemeriksaan = require('../models/PemeriksaanJaringan');

// CREATE
exports.createPemeriksaan = async (req, res) => {
  try {
    const data = await Pemeriksaan.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ALL
exports.getAllPemeriksaan = async (req, res) => {
  try {
    const data = await Pemeriksaan.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ BY ID
exports.getPemeriksaanById = async (req, res) => {
  try {
    const data = await Pemeriksaan.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: 'Data tidak ditemukan' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller UPDATE PemeriksaanJaringan
exports.updatePemeriksaan = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Cari data berdasarkan ID
      const data = await Pemeriksaan.findByPk(id);
      if (!data) {
        return res.status(404).json({ message: 'Data tidak ditemukan' });
      }
  
      // Filter req.body agar hanya field yang valid yang diupdate
      const updatableFields = [
        'no_ba', 'pln_area', 'nama_pekerjaan', 'nama_pelanggan', 'alamat_lokasi',
        'rayon', 'tanggal', 'spk_sutm', 'spk_sutr', 'spk_gtt',
        'sutm_as3c', 'sutr_bund_conductor', 'trafo_3ph', 'keterangan',
        'petugas1','petugas2','petugas3','petugas4','petugas5',
        'foto1','foto2','foto3'
      ];
  
      const updateData = {};
      for (let field of updatableFields) {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      }
  
      // Update data
      await data.update(updateData);
  
      // Ambil data terbaru setelah update
      const updatedData = await Pemeriksaan.findByPk(id);
  
      // Kirim response
      res.status(200).json({
        message: 'Data berhasil diperbarui',
        data: updatedData
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Terjadi kesalahan saat memperbarui data',
        error: error.message
      });
    }
  };
  

// DELETE
exports.deletePemeriksaan = async (req, res) => {
  try {
    const data = await Pemeriksaan.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: 'Data tidak ditemukan' });
    await data.destroy();
    res.json({ message: 'Data berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

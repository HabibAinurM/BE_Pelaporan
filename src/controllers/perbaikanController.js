const Perbaikan = require("../models/Perbaikan");
const Laporan = require("../models/Laporan");

// POST /api/perbaikan
exports.createPerbaikan = async (req, res) => {
  try {
    const { laporan_id, jenis_perbaikan, kapasitas, daftar_trafo } = req.body;

    // Validasi
    if (!laporan_id || !jenis_perbaikan) {
      return res.status(400).json({ message: "laporan_id dan jenis_perbaikan wajib diisi." });
    }

    // Buat record perbaikan
    const perbaikan = await Perbaikan.create({
      laporan_id,
      jenis_perbaikan,
      kapasitas: jenis_perbaikan === "gantiTrafoMobile" ? kapasitas : null,
      daftar_trafo: jenis_perbaikan === "kopelTrafoSebelah" ? daftar_trafo : null,
    });

    // Update status laporan
    await Laporan.update(
      { status: "Dalam Perbaikan" },
      { where: { id: laporan_id } }
    );

    res.status(201).json({
      message: "Perbaikan berhasil disimpan.",
      data: perbaikan,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/perbaikan/:laporan_id
exports.getPerbaikanByLaporan = async (req, res) => {
  try {
    const { laporan_id } = req.params;
    const perbaikan = await Perbaikan.findOne({ where: { laporan_id } });
    if (!perbaikan) return res.status(404).json({ message: "Data perbaikan tidak ditemukan." });
    res.json(perbaikan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/perbaikan
exports.getAllPerbaikan = async (req, res) => {
  try {
    const all = await Perbaikan.findAll({ include: Laporan });
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

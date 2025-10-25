// controllers/hasilTestJaringanController.js
const HasilTestJaringan = require("../models/HasilTestJaringan");
const User = require("../models/User");
const path = require("path");
const fs = require("fs");

// helper: hapus file fisik (safe)
const safeUnlink = (filePath) => {
  try {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  } catch (err) {
    console.error("Failed delete file:", filePath, err.message);
  }
};

exports.createHasilTestJaringan = async (req, res) => {
  try {
    const payload = { ...req.body };
    payload.userId = req.user.id;

    // jika frontend sebelumnya mengupload file via /api/upload, kirimkan lampiran di body sebagai JSON string/array
    // pastikan lampiran sudah berupa array objek
    if (payload.lampiran && typeof payload.lampiran === "string") {
      try { payload.lampiran = JSON.parse(payload.lampiran); } catch (e) {}
    }

    const data = await HasilTestJaringan.create(payload);
    res.status(201).json({ message: "Data berhasil disimpan", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menyimpan data", error: error.message });
  }
};

exports.getAllHasilTestJaringan = async (req, res) => {
  try {
    const data = await HasilTestJaringan.findAll({
    include: [{ model: User, attributes: ["id", "name", "email"] }],
  });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil data", error: error.message });
  }
};

exports.getHasilTestJaringanById = async (req, res) => {
  try {
    const data = await HasilTestJaringan.findByPk(req.params.id, {
    include: [{ model: User, attributes: ["id", "name", "email"] }],
  });
    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil data", error: error.message });
  }
};

exports.updateHasilTestJaringan = async (req, res) => {
  try {
    const record = await HasilTestJaringan.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: "Data tidak ditemukan" });

    // optional: cek apakah pemilik (authorization)
    // if (record.userId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

    const payload = { ...req.body };

    // handle lampiran: payload.lampiran bisa berupa array baru atau JSON string
    if (payload.lampiran && typeof payload.lampiran === "string") {
      try { payload.lampiran = JSON.parse(payload.lampiran); } catch (e) {}
    }

    // Jika ada removeFiles[] di body (array of filename strings) => hapus file dari disk dan dari record
    let currentLampiran = Array.isArray(record.lampiran) ? record.lampiran : [];
    if (payload.removeFiles) {
      let removeFiles = payload.removeFiles;
      if (typeof removeFiles === "string") {
        try { removeFiles = JSON.parse(removeFiles); } catch (e) { removeFiles = [removeFiles]; }
      }
      removeFiles.forEach(filename => {
        // cari item di currentLampiran
        const idx = currentLampiran.findIndex(it => it.filename === filename);
        if (idx !== -1) {
          const p = path.join(__dirname, "..", currentLampiran[idx].path); // path stored is like /uploads/test-jaringan/xxx
          safeUnlink(p);
          currentLampiran.splice(idx, 1);
        }
      });
    }

    // Jika ada payload.lampiran (mis: dari frontend setelah upload) => append ke current
    if (payload.lampiran && Array.isArray(payload.lampiran)) {
      currentLampiran = currentLampiran.concat(payload.lampiran);
    }

    // Simpan updated lampiran ke payload
    payload.lampiran = currentLampiran;

    // update record
    await record.update(payload);
    res.status(200).json({ message: "Data berhasil diperbarui", data: record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal memperbarui data", error: error.message });
  }
};

exports.deleteHasilTestJaringan = async (req, res) => {
  try {
    const record = await HasilTestJaringan.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: "Data tidak ditemukan" });

    // hapus file-file terkait
    const lampiran = Array.isArray(record.lampiran) ? record.lampiran : [];
    lampiran.forEach(it => {
      try {
        const fp = path.join(__dirname, "..", it.path);
        safeUnlink(fp);
      } catch (err) {
        console.error("Error deleting file:", err);
      }
    });

    await record.destroy();
    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menghapus data", error: error.message });
  }
};

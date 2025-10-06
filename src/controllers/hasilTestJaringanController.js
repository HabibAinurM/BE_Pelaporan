const HasilTestJaringan = require("../models/HasilTestJaringan");
const User = require("../models/User");

// CREATE
exports.createHasilTestJaringan = async (req, res) => {
  try {
    const data = await HasilTestJaringan.create({
      ...req.body,
      userId: req.user.id, // user login yang sedang aktif
    });
    res.status(201).json({
      message: "Data hasil test jaringan berhasil disimpan",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menyimpan data",
      error: error.message,
    });
  }
};

// READ ALL
exports.getAllHasilTestJaringan = async (req, res) => {
  try {
    const data = await HasilTestJaringan.findAll({
      include: [{ model: User, as: "user", attributes: ["id", "username", "email"] }],
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data",
      error: error.message,
    });
  }
};

// READ BY ID
exports.getHasilTestJaringanById = async (req, res) => {
  try {
    const data = await HasilTestJaringan.findByPk(req.params.id, {
      include: [{ model: User, as: "user", attributes: ["id", "username", "email"] }],
    });
    if (!data) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data",
      error: error.message,
    });
  }
};

// UPDATE
exports.updateHasilTestJaringan = async (req, res) => {
  try {
    const data = await HasilTestJaringan.findByPk(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
    await data.update(req.body);
    res.status(200).json({
      message: "Data berhasil diperbarui",
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal memperbarui data",
      error: error.message,
    });
  }
};

// DELETE
exports.deleteHasilTestJaringan = async (req, res) => {
  try {
    const data = await HasilTestJaringan.findByPk(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
    await data.destroy();
    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus data",
      error: error.message,
    });
  }
};
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ===================== GET SEMUA USER =====================
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "nama", "email", "role"], // tampilkan field penting saja
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getAllUsers:", error);
    res.status(500).json({ message: "Gagal mengambil data user." });
  }
};

// ===================== GET USER BY ID =====================
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "nama", "email", "role"],
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error getUserById:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};

// ===================== TAMBAH USER =====================
exports.createUser = async (req, res) => {
  try {
    const { nama, email, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah digunakan." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      nama,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({
      message: "User berhasil dibuat.",
      data: {
        id: newUser.id,
        nama: newUser.nama,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error createUser:", error);
    res.status(500).json({ message: "Gagal membuat user." });
  }
};

// ===================== EDIT USER =====================
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, email, password, role } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    let updatedData = { nama, email, role };

    // Jika password baru dikirim, hash ulang
    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    await user.update(updatedData);

    res.status(200).json({
      message: "User berhasil diperbarui.",
      data: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error updateUser:", error);
    res.status(500).json({ message: "Gagal memperbarui user." });
  }
};

// ===================== HAPUS USER =====================
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    await user.destroy();
    res.status(200).json({ message: "User berhasil dihapus." });
  } catch (error) {
    console.error("Error deleteUser:", error);
    res.status(500).json({ message: "Gagal menghapus user." });
  }
};

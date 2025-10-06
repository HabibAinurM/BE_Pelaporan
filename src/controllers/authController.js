const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "Email sudah terdaftar" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
      role: role || "user"
    });

    res.status(201).json({ message: "Registrasi berhasil", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "User tidak ditemukan" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Password salah" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login berhasil", token });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
  }
};

// LOGOUT
exports.logout = async (req, res) => {
  // Karena JWT stateless, cukup frontend hapus token
  res.json({ message: "Logout berhasil, silakan hapus token di frontend" });
};

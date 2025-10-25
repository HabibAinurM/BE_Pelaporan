const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

// ================== GET SEMUA USER ==================
router.get("/users", authMiddleware, getAllUsers);

// ================== GET USER BY ID ==================
router.get("/users/:id", authMiddleware, getUserById);

// ================== CREATE USER ==================
router.post("/users", authMiddleware, createUser);

// ================== UPDATE USER ==================
router.put("/users/:id", authMiddleware, updateUser);

// ================== DELETE USER ==================
router.delete("/users/:id", authMiddleware, deleteUser);

module.exports = router;

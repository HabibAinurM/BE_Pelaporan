const express = require("express");
const router = express.Router();
const hasilTestJaringanController = require("../controllers/hasilTestJaringanController");
const { authMiddleware } = require("../middleware/authMiddleware");


router.post("/", authMiddleware, hasilTestJaringanController.createHasilTestJaringan);
router.get("/", authMiddleware, hasilTestJaringanController.getAllHasilTestJaringan);
router.get("/:id", authMiddleware, hasilTestJaringanController.getHasilTestJaringanById);
router.put("/:id", authMiddleware, hasilTestJaringanController.updateHasilTestJaringan);
router.delete("/:id", authMiddleware, hasilTestJaringanController.deleteHasilTestJaringan);

module.exports = router;

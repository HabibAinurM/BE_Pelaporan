const express = require("express");
const router = express.Router();
const {
  createPerbaikan,
  getPerbaikanByLaporan,
  getAllPerbaikan,
} = require("../controllers/perbaikanController");

router.get("/", getAllPerbaikan);
router.get("/:laporan_id", getPerbaikanByLaporan);
router.post("/", createPerbaikan);

module.exports = router;

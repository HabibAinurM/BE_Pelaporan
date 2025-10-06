const express = require('express');
const router = express.Router();
const pemeriksaanController = require('../controllers/pemeriksaanController');
const { authMiddleware } = require("../middleware/authMiddleware");

router.post('/', authMiddleware, pemeriksaanController.createPemeriksaan);
router.get('/', authMiddleware, pemeriksaanController.getAllPemeriksaan);
router.get('/:id', authMiddleware, pemeriksaanController.getPemeriksaanById);
router.put('/:id', authMiddleware, pemeriksaanController.updatePemeriksaan);
router.delete('/:id', authMiddleware, pemeriksaanController.deletePemeriksaan);

module.exports = router;

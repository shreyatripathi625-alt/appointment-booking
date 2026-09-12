const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { createOrUpdateProfile, getAllDoctors } = require('../controllers/doctorController');

router.post('/profile', verifyToken, createOrUpdateProfile);
router.get('/all', getAllDoctors);

module.exports = router;
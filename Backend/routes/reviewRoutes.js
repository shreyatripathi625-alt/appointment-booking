const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { addReview, getDoctorReviews } = require('../controllers/reviewController');

// Post review (Protected)
router.post('/add', verifyToken, addReview);

// Get reviews of a doctor (Public)
router.get('/doctor/:doctorId', getDoctorReviews);

module.exports = router;
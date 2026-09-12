const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const {
  bookAppointment,
  getMyAppointments,
  updateAppointmentStatus
} = require('../controllers/appointmentController');

// All routes are protected by verifyToken middleware
router.post('/book', verifyToken, bookAppointment);
router.get('/my-appointments', verifyToken, getMyAppointments);
router.put('/update-status/:id', verifyToken, updateAppointmentStatus);

module.exports = router;
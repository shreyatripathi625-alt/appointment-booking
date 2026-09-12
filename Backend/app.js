const express = require("express");
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');//Imported
const appointmentRoutes = require('./routes/appointmentRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);
app.get("/", (req, res) => {
    res.send("Appointment Booking API is running");
});

module.exports = app;
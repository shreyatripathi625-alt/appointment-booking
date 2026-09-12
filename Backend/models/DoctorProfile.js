const mongoose = require('mongoose');

const doctorProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialization: { type: String, required: true },
  experienceYears: { type: Number, required: true },
  fees: { type: Number, required: true },
  timeSlots: [{ type: String }], // e.g., ['10:00 AM', '11:00 AM', '02:00 PM']
  about: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('DoctorProfile', doctorProfileSchema);
const Appointment = require('../models/Appointment');

// 1. Book New Appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, timeSlot } = req.body;
    const patientId = req.user.userId; // Middleware se milega

    // Double-booking Check: Kya doctor ka ye slot pehle se booked hai?
    const existingBooking = await Appointment.findOne({ doctor: doctorId, date, timeSlot, status: { $ne: 'cancelled' } });
    if (existingBooking) {
      return res.status(400).json({ message: 'This slot is already booked for the selected date.' });
    }

    const appointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      date,
      timeSlot
    });

    await appointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// 2. Get User Appointments (Patient ya Doctor dono ke liye)
exports.getMyAppointments = async (req, res) => {
  try {
    const { userId, role } = req.user;
    let query = {};

    if (role === 'doctor') {
      query = { doctor: userId };
    } else {
      query = { patient: userId };
    }

    const appointments = await Appointment.find(query)
      .populate('patient', 'name email')
      .populate('doctor', 'name email');

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// 3. Update Appointment Status (Confirmed / Cancelled)
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: 'Status updated successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
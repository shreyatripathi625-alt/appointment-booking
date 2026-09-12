const DoctorProfile = require('../models/DoctorProfile');

// 1. Doctor Profile Create / Update karna
exports.createOrUpdateProfile = async (req, res) => {
  try {
    const { specialization, experienceYears, fees, timeSlots, about } = req.body;
    
    let profile = await DoctorProfile.findOne({ user: req.user.userId });

    if (profile) {
      // Update
      profile = await DoctorProfile.findOneAndUpdate(
        { user: req.user.userId },
        { specialization, experienceYears, fees, timeSlots, about },
        { new: true }
      );
      return res.json({ message: 'Profile updated successfully', profile });
    }

    // Create New
    profile = new DoctorProfile({
      user: req.user.userId,
      specialization,
      experienceYears,
      fees,
      timeSlots,
      about
    });

    await profile.save();
    res.status(201).json({ message: 'Doctor profile created', profile });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// 2. All Doctors ki list fetch karna (Search & Filter ke sath)
exports.getAllDoctors = async (req, res) => {
  try {
    const { specialization } = req.query;
    let query = {};

    if (specialization) {
      query.specialization = { $regex: specialization, $options: 'i' };
    }

    const doctors = await DoctorProfile.find(query).populate('user', 'name email');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
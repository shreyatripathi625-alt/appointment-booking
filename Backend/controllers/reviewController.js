const Review = require('../models/Review');

// 1. Post a Review (Only for Logged-in Patients)
exports.addReview = async (req, res) => {
  try {
    const { doctorId, rating, comment } = req.body;
    const patientId = req.user.userId; // Token se milega

    // Ek patient ek doctor ko ek hi review de sakta hai (Optional Logic)
    const existingReview = await Review.findOne({ patient: patientId, doctor: doctorId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this doctor' });
    }

    const review = new Review({
      patient: patientId,
      doctor: doctorId,
      rating,
      comment
    });

    await review.save();
    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// 2. Get All Reviews for a Specific Doctor
exports.getDoctorReviews = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const reviews = await Review.find({ doctor: doctorId })
      .populate('patient', 'name') // Patient ka sirf naam dikhayega
      .sort({ createdAt: -1 }); // Latest review sabse pehle

    // Average Rating Calculate karna
    const totalReviews = reviews.length;
    const avgRating = totalReviews > 0 
      ? (reviews.reduce((acc, item) => item.rating + acc, 0) / totalReviews).toFixed(1)
      : 0;

    res.json({
      totalReviews,
      avgRating,
      reviews
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    specialization: {
      type: String, // e.g., Psychiatrist, Therapist
      required: true,
    },
    experience: {
      type: Number, // Years of experience
      required: true,
    },
    feePerConsultation: {
      type: Number,
      required: true,
    },
    // For Location-based features
    location: {
      address: String,
      city: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    // Simple availability: Days available and time range
    availability: {
      days: [String], // e.g., ['Mon', 'Wed', 'Fri']
      startTime: String, // '09:00'
      endTime: String,   // '17:00'
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Doctor', doctorSchema);
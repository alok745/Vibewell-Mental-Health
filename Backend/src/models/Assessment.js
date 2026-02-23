const mongoose = require('mongoose');

const assessmentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    type: {
      type: String,
      required: true,
      enum: ['PHQ-9', 'GAD-7'], // Restrict to specific test types
    },
    responses: {
      type: [Number], // Array of scores (0-3) for each question
      required: true,
      validate: [
        (val) => val.length > 0, // Ensure array is not empty
        'Responses cannot be empty',
      ],
    },
    score: {
      type: Number,
      required: true,
    },
    severity: {
      type: String,
      required: true,
      enum: ['None', 'Mild', 'Moderate', 'Severe'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Assessment', assessmentSchema);
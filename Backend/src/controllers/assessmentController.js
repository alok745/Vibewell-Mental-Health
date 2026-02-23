const Assessment = require('../models/Assessment');


const calculateSeverity = (score, type) => {
  if (type === 'PHQ-9') {
    
    if (score <= 4) return 'None';
    if (score <= 9) return 'Mild';
    if (score <= 14) return 'Moderate';
    return 'Severe';
  } else if (type === 'GAD-7') {
  
    if (score <= 4) return 'None';
    if (score <= 9) return 'Mild';
    if (score <= 14) return 'Moderate';
    return 'Severe';
  }
  return 'None';
};

// @desc    Submit a new assessment
// @route   POST /api/assessments
// @access  Private
const submitAssessment = async (req, res) => {
  try {
    const { type, responses } = req.body;

    if (!type || !responses || !Array.isArray(responses)) {
      return res.status(400).json({ message: 'Invalid data provided' });
    }

    // 1. Calculate Total Score
    const score = responses.reduce((acc, curr) => acc + curr, 0);

    // 2. Determine Severity
    const severity = calculateSeverity(score, type);

    // 3. Save to Database
    const assessment = await Assessment.create({
      user: req.user.id,
      type,
      responses,
      score,
      severity,
    });

    res.status(201).json(assessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's assessment history
// @route   GET /api/assessments
// @access  Private
const getMyAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({ user: req.user.id }).sort({
      createdAt: -1, // Newest first
    });
    res.status(200).json(assessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitAssessment,
  getMyAssessments,
};
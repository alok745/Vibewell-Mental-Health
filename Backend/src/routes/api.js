
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { submitAssessment, getHistory } = require('../controllers/assessmentController');
const auth = require('../middleware/auth'); // You'll need a simple JWT middleware

// Auth Routes
router.post('/auth/register', register);
router.post('/auth/login', login);

// Assessment Routes (Protected)
router.post('/assessment', auth, submitAssessment);
router.get('/assessment/history', auth, getHistory);

module.exports = router;
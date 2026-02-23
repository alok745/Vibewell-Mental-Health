const express = require('express');
const router = express.Router();
const { chatWithAI, analyzeMood } = require('../controllers/aiController');
const { protect } = require('../middlewares/authMiddleware');

// All AI routes are protected
router.post('/chat', protect, chatWithAI);
router.post('/analyze', protect, analyzeMood);

module.exports = router;
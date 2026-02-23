// const express = require('express');
// const router = express.Router();
// const {
//   submitAssessment,
//   getMyAssessments,
// } = require('../controllers/assessmentController');
// const { protect } = require('../middlewares/authMiddleware');

// router.post('/', protect, submitAssessment);
// router.get('/', protect, getMyAssessments);

// module.exports = router;





// const { body } = require("express-validator");

// router.post(
//   "/",
//   protect,
//   [
//     body("type").notEmpty().withMessage("Assessment type required"),
//     body("score").isNumeric().withMessage("Score must be numeric"),
//   ],
//   submitAssessment
// );







const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const {
  submitAssessment,
  getMyAssessments,
} = require("../controllers/assessmentController");

const { protect } = require("../middlewares/authMiddleware");

// POST /api/assessments
router.post(
  "/",
  protect,
  [
    body("type").notEmpty().withMessage("Assessment type required"),
    body("score").isNumeric().withMessage("Score must be numeric"),
  ],
  submitAssessment
);

// GET /api/assessments
router.get("/", protect, getMyAssessments);

module.exports = router;

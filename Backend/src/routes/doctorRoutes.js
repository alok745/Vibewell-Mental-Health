const express = require('express');
const authorizeRoles = require("../middlewares/roleMiddleware");
const router = express.Router();

const {
  getDoctors,
  bookAppointment,
  seedDoctors
} = require('../controllers/doctorController');
const { protect } = require('../middlewares/authMiddleware');

// VIVA EXPLANATION: We use .get for /seed so the developer can 
// trigger it simply by visiting the URL in a browser.
router.get('/seed', seedDoctors); 
router.get('/', getDoctors);
router.get("/seed", protect, authorizeRoles("admin"), seedDoctors);



// Protected routes
router.post('/book', protect, bookAppointment);

module.exports = router;
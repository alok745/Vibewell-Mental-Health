// const express = require('express');
// const router = express.Router();
// const {
//   registerUser,
//   loginUser,
//   getMe,
// } = require('../controllers/authController');
// const { protect } = require('../middlewares/authMiddleware');

// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.get('/me', protect, getMe);

// module.exports = router;
















// const express = require("express");
// const router = express.Router();
// const { registerUser, loginUser } = require("../controllers/authController");

// // Register
// router.post("/register", registerUser);

// // Login
// router.post("/login", loginUser);

// module.exports = router;



const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const { loginUser, registerUser } = require("../controllers/authController");

// REGISTER VALIDATION
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  registerUser
);

// LOGIN VALIDATION
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginUser
);

module.exports = router;

// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const morgan = require('morgan');
// const authRoutes = require('./routes/authRoutes');
// const aiRoutes = require('./routes/aiRoutes');
// const assessmentRoutes = require('./routes/assessmentRoutes');



// // Initialize Express app
// const app = express();

// // --- MIDDLEWARES (VIVA EXPLANATION) ---

// // 1. Security Headers (Helmet): Adds HTTP headers to protect against XSS and other attacks.
// app.use(helmet());

// // 2. CORS (Cross-Origin Resource Sharing): Allows your React frontend (running on a different port)
// // to communicate with this backend.
// app.use(cors());

// // 3. Body Parser: Allows the server to accept JSON data in the body of POST requests.
// app.use(express.json());

// // 4. Logger (Morgan): Logs incoming requests to the console (useful for debugging).
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

// // --- ROUTES ---
// // Basic health check route to verify server is running
// app.get('/', (req, res) => {
//   res.send('VibeWell API is running...');
// });


// app.use('/api/auth', authRoutes);

// app.use('/api/ai', aiRoutes);
// app.use('/api/assessments', assessmentRoutes);


// app.use('/api/doctors', require('./routes/doctorRoutes'));






// // We will mount our API routes here later (e.g., app.use('/api/users', userRoutes))

// // --- ERROR HANDLING ---
// // Middleware to handle 404s (Not Found)
// app.use((req, res, next) => {
//   const error = new Error(`Not Found - ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// });

// module.exports = app;

























// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const morgan = require('morgan');

// // Import Routes
// const authRoutes = require('./routes/authRoutes');
// const aiRoutes = require('./routes/aiRoutes');
// const assessmentRoutes = require('./routes/assessmentRoutes'); // New
// const doctorRoutes = require('./routes/doctorRoutes');         // New

// // Initialize Express app
// const app = express();

// // --- MIDDLEWARES ---
// app.use(helmet());
// app.use(cors());
// app.use(express.json());

// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

// // --- ROUTES ---
// app.use('/api/auth', authRoutes);
// app.use('/api/ai', aiRoutes);
// app.use('/api/assessments', assessmentRoutes); // Wired
// app.use('/api/doctors', doctorRoutes);         // Wired

// app.get('/', (req, res) => {
//   res.send('VibeWell API is running...');
// });    

// // Error handling
// app.use((req, res, next) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// module.exports = app;


















const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const limiter = require("./middlewares/rateLimiter");
const authRoutes = require("./routes/authRoutes");
const assessmentRoutes = require("./routes/assessmentRoutes");
const aiRoutes = require("./routes/aiRoutes");
const doctorRoutes = require("./routes/doctorRoutes");


const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

// Body parser
app.use(express.json());

// CORS
app.use(cors());
app.use(limiter);


// Helmet (disable CSP in development)
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
} else {
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
}

// Root route
app.get("/", (req, res) => {
  res.send("VibeWell API is running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/doctors", doctorRoutes);


// Error handler
app.use(errorMiddleware);

module.exports = app;









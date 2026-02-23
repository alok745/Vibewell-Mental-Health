const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Book an appointment
// @route   POST /api/doctors/book
// @access  Private
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, timeSlot, notes } = req.body;

    // 1. Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // 2. Simple concurrency check (Viva point: preventing double booking)
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      date,
      timeSlot,
      status: { $ne: 'cancelled' }
    });

    if (existingAppointment) {
      return res.status(400).json({ message: 'Time slot not available' });
    }

    // 3. Create Appointment
    const appointment = await Appointment.create({
      user: req.user.id,
      doctor: doctorId,
      date,
      timeSlot,
      notes,
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Seed (Create) sample doctors for testing
// @route   POST /api/doctors/seed
// @access  Public (In production, this should be Admin only)
const seedDoctors = async (req, res) => {
  try {
    const sampleDoctors = [
      {
        name: 'Dr. Priya Sharma',
        specialization: 'Psychiatrist',
        experience: 12,
        feePerConsultation: 800,
        location: { city: 'Delhi', address: 'AIIMS Campus, Ansari Nagar' },
        availability: { days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], startTime: '09:00', endTime: '17:00' }
      },
      {
        name: 'Dr. Rajesh Gupta',
        specialization: 'Clinical Psychologist',
        experience: 8,
        feePerConsultation: 600,
        location: { city: 'Mumbai', address: '204 Bandra West, Hill Road' },
        availability: { days: ['Mon', 'Wed', 'Fri'], startTime: '10:00', endTime: '18:00' }
      },
      {
        name: 'Dr. Ananya Iyer',
        specialization: 'Cognitive Behavioral Therapist',
        experience: 6,
        feePerConsultation: 500,
        location: { city: 'Bangalore', address: 'MG Road, Koramangala' },
        availability: { days: ['Tue', 'Thu', 'Sat'], startTime: '09:00', endTime: '15:00' }
      },
      {
        name: 'Dr. Vikram Singh',
        specialization: 'Psychiatrist',
        experience: 15,
        feePerConsultation: 1200,
        location: { city: 'Chandigarh', address: 'Sector 17, PGI Hospital' },
        availability: { days: ['Mon', 'Tue', 'Wed'], startTime: '08:00', endTime: '14:00' }
      },
      {
        name: 'Dr. Meera Patel',
        specialization: 'Child Psychologist',
        experience: 10,
        feePerConsultation: 700,
        location: { city: 'Ahmedabad', address: 'CG Road, Navrangpura' },
        availability: { days: ['Mon', 'Wed', 'Fri', 'Sat'], startTime: '10:00', endTime: '16:00' }
      },
      {
        name: 'Dr. Arjun Reddy',
        specialization: 'Neuropsychiatrist',
        experience: 18,
        feePerConsultation: 1500,
        location: { city: 'Hyderabad', address: 'Jubilee Hills, Road No. 10' },
        availability: { days: ['Mon', 'Tue', 'Thu'], startTime: '09:00', endTime: '13:00' }
      },
      {
        name: 'Dr. Kavita Deshmukh',
        specialization: 'Counseling Psychologist',
        experience: 7,
        feePerConsultation: 450,
        location: { city: 'Pune', address: 'FC Road, Shivajinagar' },
        availability: { days: ['Tue', 'Wed', 'Thu', 'Fri'], startTime: '11:00', endTime: '19:00' }
      },
      {
        name: 'Dr. Sanjay Malhotra',
        specialization: 'Addiction Psychiatrist',
        experience: 14,
        feePerConsultation: 1000,
        location: { city: 'Lucknow', address: 'Gomti Nagar, KGMU Road' },
        availability: { days: ['Mon', 'Wed', 'Fri'], startTime: '09:00', endTime: '16:00' }
      },
      {
        name: 'Dr. Nisha Roy',
        specialization: 'Trauma Therapist',
        experience: 9,
        feePerConsultation: 650,
        location: { city: 'Kolkata', address: 'Park Street, Camac Street' },
        availability: { days: ['Mon', 'Tue', 'Wed', 'Thu'], startTime: '10:00', endTime: '17:00' }
      },
      {
        name: 'Dr. Arun Kumar',
        specialization: 'Geriatric Psychiatrist',
        experience: 20,
        feePerConsultation: 900,
        location: { city: 'Chennai', address: 'Anna Nagar, 2nd Avenue' },
        availability: { days: ['Tue', 'Thu', 'Sat'], startTime: '08:00', endTime: '14:00' }
      },
      {
        name: 'Dr. Simran Kaur',
        specialization: 'Psychotherapist',
        experience: 5,
        feePerConsultation: 400,
        location: { city: 'Jaipur', address: 'MI Road, Ashok Nagar' },
        availability: { days: ['Mon', 'Wed', 'Fri', 'Sat'], startTime: '10:00', endTime: '18:00' }
      },
      {
        name: 'Dr. Mohan Das',
        specialization: 'Forensic Psychiatrist',
        experience: 16,
        feePerConsultation: 1100,
        location: { city: 'Kochi', address: 'MG Road, Ernakulam' },
        availability: { days: ['Mon', 'Tue', 'Thu', 'Fri'], startTime: '09:00', endTime: '15:00' }
      }
    ];

    await Doctor.deleteMany(); // Clear existing
    const createdDoctors = await Doctor.insertMany(sampleDoctors);
    res.json(createdDoctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDoctors,
  bookAppointment,
  seedDoctors
};
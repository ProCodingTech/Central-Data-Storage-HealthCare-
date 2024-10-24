const mongoose = require('mongoose');

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
  addedByUserId: { 
    type: String, 
    required: true, 
    match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/ // UUID format
  },
  timeStart: { 
    type: Date, 
    required: true 
  },
  timeEnd: { 
    type: Date, 
    required: true,
    validate: {
      validator: function(v) {
        return v > this.timeStart; // Ensure end time is after start time
      },
      message: 'End time must be after start time!'
    }
  },
  doctorId: { 
    type: String, 
    required: true, 
    match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/ // UUID format
  },
  patientId: { 
    type: String, 
    required: true, 
    match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/ // UUID format
  },
  status: { 
    type: String, 
    enum: ["Scheduled", "Completed", "Cancelled"], 
    required: true 
  }
}, {
  timestamps: true,
});

const DoctorAppointment = mongoose.model('DrAppointment', appointmentSchema);
module.exports = DoctorAppointment;
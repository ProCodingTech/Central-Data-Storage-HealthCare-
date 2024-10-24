const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    description: "Full name of the doctor"
  },
  dateOfBirth: {
    type: Date,
    required: true,
    description: "Doctor's date of birth in YYYY-MM-DD format"
  },
  sex: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
    description: "Sex of the doctor"
  },
  address: {
    type: String,
    trim: true,
    description: "Doctor's address"
  },
  phoneNumber: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v); // Assuming a 10-digit phone number
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    description: "Doctor's contact phone number"
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Invalid email format"],
    description: "Doctor's email address"
  },
  specialization: {
    type: String,
    required: true,
    description: "Medical specialization of the doctor"
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
    description: "Doctor's medical license number"
  },
  yearsOfExperience: {
    type: Number,
    min: 0,
    required: true,
    description: "Years of experience the doctor has"
  },
  hospitalAffiliations: [{
    hospitalName: {
      type: String,
      required: true,
      trim: true,
      description: "Name of the hospital"
    },
    affiliationDate: {
      type: Date,
      required: true,
      description: "Date of hospital affiliation"
    }
  }],
  consultations: [{
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
      description: "ID of the patient consulted"
    },
    dateOfConsultation: {
      type: Date,
      required: true,
      description: "Date and time of the consultation"
    },
    chiefComplaint: {
      type: String,
      required: true,
      trim: true,
      description: "Primary complaint of the patient"
    },
    diagnosis: {
      type: String,
      trim: true,
      description: "Diagnosis made during the consultation"
    },
    treatmentPlan: {
      type: String,
      trim: true,
      description: "Recommended treatment plan"
    }
  }],
  labTestsOrdered: [{
    testType: {
      type: String,
      required: true,
      trim: true,
      description: "Type of lab test ordered (e.g., Blood Test)"
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
      description: "ID of the patient"
    },
    dateOrdered: {
      type: Date,
      required: true,
      description: "Date and time the lab test was ordered"
    }
  }],
  surgeriesPerformed: [{
    surgeryCode: {
      type: String,
      required: true,
      trim: true,
      description: "Code for the surgery"
    },
    surgeryDescription: {
      type: String,
      required: true,
      trim: true,
      description: "Description of the surgery performed"
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
      description: "ID of the patient"
    },
    dateOfSurgery: {
      type: Date,
      required: true,
      description: "Date the surgery was performed"
    }
  }],
  certifications: [{
    certificationName: {
      type: String,
      required: true,
      trim: true,
      description: "Name of the certification"
    },
    certificationDate: {
      type: Date,
      required: true,
      description: "Date the certification was obtained"
    },
    validUntil: {
      type: Date,
      description: "Expiration date of the certification"
    }
  }],
  availability: [{
    dayOfWeek: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true,
      description: "Day of the week"
    },
    startTime: {
      type: String,
      required: true,
      description: "Start time of availability in HH:MM format"
    },
    endTime: {
      type: String,
      required: true,
      description: "End time of availability in HH:MM format"
    }
  }]
}, {
  timestamps: true
});

const Doctor = mongoose.model('Doctor', DoctorSchema);
module.exports = Doctor;
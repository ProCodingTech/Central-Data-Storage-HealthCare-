const mongoose = require('mongoose');

// Patient Details Schema
const patientDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
}, { _id: false });

// Test Details Schema
const testDetailsSchema = new mongoose.Schema({
  testId: {
    type: String,
    required: true,
  },
  testName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
}, { _id: false });

// Booking Service Schema
const bookingServiceSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  patientDetails: {
    type: patientDetailsSchema,
    required: true,
  },
  testDetails: {
    type: [testDetailsSchema],
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    required: true,
  },
}, { _id: false });

// Test Results Schema
const testResultsSchema = new mongoose.Schema({
  testId: {
    type: String,
    required: true,
  },
  testName: {
    type: String,
    required: true,
  },
  resultValue: {
    type: String,
    required: true,
  },
  units: {
    type: String,
    required: true,
  },
  normalRange: {
    type: String,
    required: true,
  },
  testDate: {
    type: Date,
    required: true,
  },
}, { _id: false });

// Lab Results Service Schema
const labResultsServiceSchema = new mongoose.Schema({
  resultId: {
    type: String,
    required: true,
    unique: true,
  },
  bookingId: {
    type: String,
    required: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  testResults: {
    type: [testResultsSchema],
    required: true,
  },
  doctorComments: {
    type: String,
  },
}, { _id: false });

// Communication Messages Schema
const communicationMessageSchema = new mongoose.Schema({
  messageId: {
    type: String,
    required: true,
    unique: true,
  },
  sender: {
    type: String,
    enum: ["Patient", "Doctor"],
    required: true,
  },
  messageContent: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
}, { _id: false });

// Communication Service Schema
const communicationServiceSchema = new mongoose.Schema({
  communicationId: {
    type: String,
    required: true,
    unique: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  doctorId: {
    type: String,
    required: true,
  },
  messages: {
    type: [communicationMessageSchema],
    required: true,
  },
}, { _id: false });

// Patient Profile Service Schema
const patientProfileServiceSchema = new mongoose.Schema({
  requestId: {
    type: String,
    required: true,
    unique: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  requestedChanges: {
    medicalHistory: {
      type: String,
    },
    allergies: {
      type: String,
    },
    currentMedications: {
      type: String,
    },
  },
  resultId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    required: true,
  },
}, { _id: false });

// Lab Tests Service Schema
const labTestsServiceSchema = new mongoose.Schema({
  testId: {
    type: String,
    required: true,
    unique: true,
  },
  testName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  specifications: {
    sampleType: {
      type: String,
    },
    processingTime: {
      type: String,
    },
  },
}, { _id: false });

// Main Lab Diagnostic Center System Schema
const labDiagnosticCenterSystemSchema = new mongoose.Schema({
  BookingService: {
    type: bookingServiceSchema,
    required: true,
  },
  LabResultsService: {
    type: labResultsServiceSchema,
    required: true,
  },
  CommunicationService: {
    type: communicationServiceSchema,
    required: true,
  },
  PatientProfileService: {
    type: patientProfileServiceSchema,
    required: true,
  },
  LabTestsService: {
    type: [labTestsServiceSchema],
    required: true,
  },
});

const LabDiagnosticCenterSystem = mongoose.model('LabDiagnosticCenterSystem', labDiagnosticCenterSystemSchema);
module.exports = LabDiagnosticCenterSystem;
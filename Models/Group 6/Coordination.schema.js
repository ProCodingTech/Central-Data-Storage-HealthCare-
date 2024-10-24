const mongoose = require('mongoose');

// Healthcare Provider Schema
const healthcareProviderSchema = new mongoose.Schema({
  providerId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    match: /^\+?[1-9]\d{1,14}$/, // Basic phone number format
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  availabilityDay: {
    type: String,
    required: true,
  },
  availabilityStartTime: {
    type: String,
    required: true,
  },
  availabilityEndTime: {
    type: String,
    required: true,
  },
});

// Patient Referral Schema
const patientReferralSchema = new mongoose.Schema({
  referralId: {
    type: String,
    required: true,
    unique: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  referringProviderId: {
    type: String,
    required: true,
  },
  referredProviderId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    required: true,
  },
});

// Care Plan Schema
const carePlanSchema = new mongoose.Schema({
  planId: {
    type: String,
    required: true,
    unique: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  assignedProviderId: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Completed"],
    required: true,
  },
});

// Task Schema
const taskSchema = new mongoose.Schema({
  taskId: {
    type: String,
    required: true,
    unique: true,
  },
  carePlanId: {
    type: String,
    required: true,
  },
  assignedToProviderId: {
    type: String,
    required: true,
  },
  taskDescription: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    required: true,
  },
});

// Communication Log Schema
const communicationLogSchema = new mongoose.Schema({
  logId: {
    type: String,
    required: true,
    unique: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  fromProviderId: {
    type: String,
    required: true,
  },
  toProviderId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  communicationType: {
    type: String,
    enum: ["Email", "Phone", "In-Person"],
    required: true,
  },
});

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
  appointmentId: {
    type: String,
    required: true,
    unique: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  providerId: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled"],
    required: true,
  },
});

// Notification Schema
const notificationSchema = new mongoose.Schema({
  notificationId: {
    type: String,
    required: true,
    unique: true,
  },
  recipientProviderId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  readStatus: {
    type: Boolean,
    default: false,
  },
});

// Main Healthcare System Schema
const healthcareSystemSchema = new mongoose.Schema({
  HealthcareProviders: healthcareProviderSchema,
  PatientReferrals: patientReferralSchema,
  CarePlans: carePlanSchema,
  Tasks: taskSchema,
  CommunicationLogs: communicationLogSchema,
  Appointments: appointmentSchema,
  Notifications: notificationSchema,
});

const HealthcareSystem = mongoose.model('HealthcareSystem', healthcareSystemSchema);
module.exports = HealthcareSystem;
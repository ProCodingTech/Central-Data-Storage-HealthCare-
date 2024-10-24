const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  certificationName: { type: String, required: true },
  certificationDate: { type: Date, required: true },
  validUntil: { type: Date, required: true }
}, { _id: false });

const shiftScheduleSchema = new mongoose.Schema({
  dayOfWeek: { 
    type: String, 
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], 
    required: true 
  },
  startTime: { type: String, required: true }, // format: HH:mm
  endTime: { type: String, required: true }   // format: HH:mm
}, { _id: false });

const patientAssignedSchema = new mongoose.Schema({
  patientID: { type: String, required: true },
  patientName: { type: String, required: true },
  dateAssigned: { type: Date, required: true }
}, { _id: false });

const labTestAssistedSchema = new mongoose.Schema({
  testType: { type: String, required: true },
  patientID: { type: String, required: true },
  dateAssisted: { type: Date, required: true }
}, { _id: false });

const nurseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  sex: { type: String, enum: ["Male", "Female", "Other"] },
  address: { type: String },
  phoneNumber: { type: String },
  email: { 
    type: String, 
    match: /.+\@.+\..+/ 
  },
  hospitalAffiliation: { type: String, required: true },
  yearsOfExperience: { type: Number, min: 0, required: true },
  certifications: [certificationSchema],
  shiftSchedule: [shiftScheduleSchema],
  patientsAssigned: [patientAssignedSchema],
  labTestsAssisted: [labTestAssistedSchema]
}, {
  timestamps: true,
  versionKey: false
});

const Nurse = mongoose.model('Nurse', nurseSchema);
module.exports = Nurse;
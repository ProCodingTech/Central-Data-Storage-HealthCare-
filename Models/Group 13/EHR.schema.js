const mongoose = require('mongoose');

const contactDetailsSchema = new mongoose.Schema({
  phoneNumber: { type: String },
  email: { type: String, match: /.+\@.+\..+/ }
}, { _id: false });

const personalInformationSchema = new mongoose.Schema({
  name: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String },
  address: { type: String },
  contactDetails: contactDetailsSchema
}, { _id: false });

const nextOfKinSchema = new mongoose.Schema({
  name: { type: String },
  relation: { type: String },
  contactNumber: { type: String }
}, { _id: false });

const visitInformationSchema = new mongoose.Schema({
  visitId: { type: String },
  assignedLocation: { type: String },
  referringDoctor: { type: String },
  visitDate: { type: Date }
}, { _id: false });

const medicalHistorySchema = new mongoose.Schema({
  diagnosis: { type: String },
  treatment: { type: String },
  date: { type: Date }
}, { _id: false });

const currentMedicationSchema = new mongoose.Schema({
  medicationName: { type: String },
  dosage: { type: String },
  frequency: { type: String },
  startDate: { type: Date },
  endDate: { type: Date }
}, { _id: false });

const labResultSchema = new mongoose.Schema({
  testName: { type: String },
  result: { type: String },
  date: { type: Date }
}, { _id: false });

const ehrServiceSchema = new mongoose.Schema({
  MSH: {
    messageId: { type: String, required: true }, // format: mid (custom validation can be added)
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    timestamp: { type: Date, required: true },
    messageType: { type: String, required: true },
    version: { type: String, required: true }
  },
  patientId: { type: String, required: true }, // format: uuid (custom validation can be added)
  personalInformation: personalInformationSchema,
  nextOfKin: nextOfKinSchema,
  visitInformation: visitInformationSchema,
  medicalHistory: [medicalHistorySchema],
  currentMedications: [currentMedicationSchema],
  labResults: [labResultSchema]
}, {
  timestamps: true,
  versionKey: false
});

const EHRService = mongoose.model('EHRService', ehrServiceSchema);
module.exports = EHRService;
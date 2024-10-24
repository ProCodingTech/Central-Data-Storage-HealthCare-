const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
  diseaseName: { type: String, required: true },
  statusOfDisease: { type: String, required: true },
  activeDisease: { type: Boolean, default: false },
  infectiousDisease: { type: Boolean, default: false },
  severity: { type: String, enum: ['Mild', 'Moderate', 'Severe'] },
  pregnancyWarning: { type: Boolean, default: false },
  dateOfDiagnosis: { type: Date, required: true },
  endOfTreatment: { type: Date },
  remarks: { type: String }
});

const insuranceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  policyNumber: { type: String, required: true, unique: true },
  coverageType: { type: String, required: true },
  expirationDate: { type: Date, required: true }
});

const emergencyContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  relationship: { type: String, required: true },
  phone: { type: String, required: true }
});

const evaluationSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  startEvaluation: { type: Date, required: true },
  endEvaluation: { type: Date },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  chiefComplaint: { type: String, required: true },
  bmi: { type: Number },
  systolicPressure: { type: Number },
  diastolicPressure: { type: Number },
  presumptiveDiagnosis: { type: String },
  nextAppointment: { type: Date }
});

const surgerySchema = new mongoose.Schema({
  code: { type: String, required: true },
  description: { type: String, required: true },
  baseCondition: { type: String },
  surgeryClassification: { type: String },
  dateOfSurgery: { type: Date, required: true }
});

const geneticRiskSchema = new mongoose.Schema({
  disease: { type: String, required: true },
  relative: { type: String, required: true },
  maternal: { type: Boolean, default: false }
});

const labTestSchema = new mongoose.Schema({
  testType: { type: String, required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  state: { type: String }
});

const medicationSchema = new mongoose.Schema({
  medicationName: { type: String, required: true },
  indication: { type: String, required: true },
  startOfTreatment: { type: Date, required: true },
  endOfTreatment: { type: Date },
  active: { type: Boolean, default: true },
  physician: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true }
});

const vaccinationSchema = new mongoose.Schema({
  vaccineName: { type: String, required: true },
  doseNumber: { type: Number, required: true },
  date: { type: Date, required: true },
  observations: { type: String }
});

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  sex: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  age: {
    years: { type: Number, required: true },
    months: { type: Number, required: true },
    days: { type: Number, required: true }
  },
  address: { type: String, required: true },
  bloodType: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  insurance: insuranceSchema,
  family: { type: String },
  receivable: { type: Number },
  primaryCareDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  emergencyContact: emergencyContactSchema,
  diseases: [diseaseSchema],
  evaluations: [evaluationSchema],
  surgeries: [surgerySchema],
  geneticRisks: [geneticRiskSchema],
  labTests: [labTestSchema],
  medications: [medicationSchema],
  vaccinations: [vaccinationSchema]
}, {
  timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
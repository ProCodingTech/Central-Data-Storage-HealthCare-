const mongoose = require('mongoose');

// Line Item Schema
const lineItemSchema = new mongoose.Schema({
  serviceCode: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
}, { _id: false });

// Bill Schema
const billSchema = new mongoose.Schema({
  billId: {
    type: String,
    required: true,
    unique: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  dateIssued: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["Pending", "Paid", "Partially Paid", "Overdue"],
    required: true,
  },
  lineItems: {
    type: [lineItemSchema],
    required: true,
  },
}, { _id: false });

// Insurance Claim Schema
const insuranceClaimSchema = new mongoose.Schema({
  claimId: {
    type: String,
    required: true,
    unique: true,
  },
  billId: {
    type: String,
    required: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  insuranceProvider: {
    type: String,
    required: true,
  },
  policyNumber: {
    type: String,
    required: true,
  },
  dateSubmitted: {
    type: Date,
    required: true,
  },
  claimAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["Submitted", "In Review", "Approved", "Partially Approved", "Denied"],
    required: true,
  },
  approvedAmount: {
    type: Number,
    min: 0,
  },
  denialReason: {
    type: String,
  },
}, { _id: false });

// Insurance Eligibility Schema
const insuranceEligibilitySchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  insuranceProvider: {
    type: String,
    required: true,
  },
  policyNumber: {
    type: String,
    required: true,
  },
  verificationDate: {
    type: Date,
    required: true,
  },
  isEligible: {
    type: Boolean,
    required: true,
  },
  coverageDetails: {
    planType: {
      type: String,
      required: true,
    },
    coverageStartDate: {
      type: Date,
      required: true,
    },
    coverageEndDate: {
      type: Date,
      required: true,
    },
    deductible: {
      type: Number,
      min: 0,
      required: true,
    },
    coinsurance: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
  },
}, { _id: false });

// Payment Schema
const paymentSchema = new mongoose.Schema({
  paymentId: {
    type: String,
    required: true,
    unique: true,
  },
  billId: {
    type: String,
    required: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentDate: {
    type: Date,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "Debit Card", "Bank Transfer", "Cash", "Check"],
    required: true,
  },
  transactionId: {
    type: String,
  },
}, { _id: false });

// Insurance Claims Summary Schema
const insuranceClaimsSummarySchema = new mongoose.Schema({
  totalSubmitted: {
    type: Number,
    min: 0,
    required: true,
  },
  totalApproved: {
    type: Number,
    min: 0,
    required: true,
  },
  totalDenied: {
    type: Number,
    min: 0,
    required: true,
  },
  averageProcessingTime: {
    type: Number,
    min: 0,
    required: true,
  },
}, { _id: false });

// Financial Report Schema
const financialReportSchema = new mongoose.Schema({
  reportId: {
    type: String,
    required: true,
    unique: true,
  },
  reportType: {
    type: String,
    enum: ["Daily", "Weekly", "Monthly", "Quarterly", "Annual"],
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
  totalBilled: {
    type: Number,
    min: 0,
    required: true,
  },
  totalCollected: {
    type: Number,
    min: 0,
    required: true,
  },
  totalPending: {
    type: Number,
    min: 0,
    required: true,
  },
  insuranceClaimsSummary: {
    type: insuranceClaimsSummarySchema,
    required: true,
  },
}, { _id: false });

// Main MedicalBillingAndInsurance Schema
const medicalBillingAndInsuranceSchema = new mongoose.Schema({
  bill: {
    type: billSchema,
    required: true,
  },
  insuranceClaim: {
    type: insuranceClaimSchema,
    required: true,
  },
  insuranceEligibility: {
    type: insuranceEligibilitySchema,
    required: true,
  },
  payment: {
    type: paymentSchema,
    required: true,
  },
  financialReport: {
    type: financialReportSchema,
    required: true,
  },
});

const MedicalBillingAndInsurance = mongoose.model('MedicalBillingAndInsurance', medicalBillingAndInsuranceSchema);
module.exports = MedicalBillingAndInsurance;
const mongoose = require('mongoose');

const billingServiceSchema = new mongoose.Schema({
    billingId: {
      type: String,
      required: true,
      unique: true,
      match: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/, // UUID format
    },
    prescriptionId: {
      type: String,
      required: true,
      match: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/, // UUID format
    },
    insuranceId: {
      type: String,
      required: true,
      match: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/, // UUID format
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    amountPaid: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Declined"],
      required: true,
    },
    billingDate: {
      type: Date,
      default: Date.now,
    },
});

const BillingService = mongoose.model('BillingService', billingServiceSchema);
module.exports = BillingService;
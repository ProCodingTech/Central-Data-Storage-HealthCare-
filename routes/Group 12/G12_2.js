const express = require("express");
const router = express.Router();
const billingController = require("../../Controllers/Group 12/BillingController");

// Create a new billing record
router.post("/billing", billingController.createBilling);

// Get all billing records
router.get("/billing", billingController.getAllBillingRecords);

// Get a billing record by ID
router.get("/billing/:id", billingController.getBillingById);

// Update a billing record
router.put("/billing/:id", billingController.updateBilling);

// Delete a billing record
router.delete("/billing/:id", billingController.deleteBilling);

// Get billing records by status
router.get("/billing-by-status", billingController.getBillingByStatus);

// Get outstanding bills
router.get("/outstanding-bills", billingController.getOutstandingBills);

module.exports = router;
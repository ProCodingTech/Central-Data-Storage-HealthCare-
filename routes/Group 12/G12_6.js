const express = require("express");
const router = express.Router();
const prescriptionController = require("../../Controllers/Group 12/PresController");

// Create a New Prescription
router.post("/prescription", prescriptionController.createPrescription);

// Get All Prescriptions
router.get("/prescription", prescriptionController.getAllPrescriptions);

// Get Prescription by ID
router.get("/prescription/:prescriptionId", prescriptionController.getPrescriptionById);

// Update Prescription
router.put("/prescription/:prescriptionId", prescriptionController.updatePrescription);

// Update Prescription Status
router.patch("/prescription/:prescriptionId/status", prescriptionController.updatePrescriptionStatus);

// Delete Prescription
router.delete("/prescription/:prescriptionId", prescriptionController.deletePrescription);

module.exports = router;
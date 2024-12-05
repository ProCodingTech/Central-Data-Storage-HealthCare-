const express = require("express");
const router = express.Router();
const ehrController = require("../../Controllers/Group 13/EHRController");

// Create a New EHR Record
router.post("/ehrs", ehrController.createEHR);

// Get All EHR Records
router.get("/ehrs", ehrController.getAllEHRs);

// Get EHR Record by Patient ID
router.get("/ehrs/patient/:patientId", ehrController.getEHRByPatientId);

// Get EHR Record by Message ID
router.get("/ehrs/message/:messageId", ehrController.getEHRByMessageId);

// Update EHR Record by Patient ID
router.put("/ehrs/patient/:patientId", ehrController.updateEHRByPatientId);

// Delete EHR Record by Patient ID
router.delete("/ehrs/patient/:patientId", ehrController.deleteEHRByPatientId);

module.exports = router;
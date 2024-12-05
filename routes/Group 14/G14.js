const express = require("express");
const router = express.Router();
const monitoringController = require("../../Controllers/Group 14/PatController");

// CRUD Operations
router.post("/monitoring", monitoringController.createMonitoringRecord);
router.get("/monitoring", monitoringController.getAllMonitoringRecords);
router.get("/monitoring/patient/:patientId", monitoringController.getMonitoringRecordByPatientId);
router.put("/monitoring/patient/:patientId", monitoringController.updateMonitoringRecordByPatientId);
router.delete("/monitoring/patient/:patientId", monitoringController.deleteMonitoringRecordByPatientId);

// Additional Features
router.post("/monitoring/patient/:patientId/alert", monitoringController.addAlertToMonitoringRecord);
router.put("/monitoring/patient/:patientId/alert/:alertId/acknowledge", monitoringController.acknowledgeAlert);
router.post("/monitoring/patient/:patientId/note", monitoringController.addNoteToMonitoringRecord);

module.exports = router;
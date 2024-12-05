const PatientMonitoringService = require("../models/PatientMonitoringService.schema");

// Create a New Patient Monitoring Record
exports.createMonitoringRecord = async (req, res) => {
  try {
    const monitoringData = req.body;

    const newRecord = new PatientMonitoringService(monitoringData);
    const savedRecord = await newRecord.save();

    res.status(201).json({ message: "Monitoring record created successfully", data: savedRecord });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Monitoring Records
exports.getAllMonitoringRecords = async (req, res) => {
  try {
    const records = await PatientMonitoringService.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Monitoring Record by Patient ID
exports.getMonitoringRecordByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    const record = await PatientMonitoringService.findOne({ patientId });

    if (!record) {
      return res.status(404).json({ message: "Monitoring record not found" });
    }

    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Monitoring Record by Patient ID
exports.updateMonitoringRecordByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const updates = req.body;

    const updatedRecord = await PatientMonitoringService.findOneAndUpdate(
      { patientId },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: "Monitoring record not found" });
    }

    res.status(200).json({ message: "Monitoring record updated successfully", data: updatedRecord });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Monitoring Record by Patient ID
exports.deleteMonitoringRecordByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    const deletedRecord = await PatientMonitoringService.findOneAndDelete({ patientId });

    if (!deletedRecord) {
      return res.status(404).json({ message: "Monitoring record not found" });
    }

    res.status(200).json({ message: "Monitoring record deleted successfully", data: deletedRecord });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add an Alert to a Patient Record
exports.addAlertToMonitoringRecord = async (req, res) => {
  try {
    const { patientId } = req.params;
    const alert = req.body;

    const record = await PatientMonitoringService.findOneAndUpdate(
      { patientId },
      { $push: { alerts: alert } },
      { new: true, runValidators: true }
    );

    if (!record) {
      return res.status(404).json({ message: "Monitoring record not found" });
    }

    res.status(200).json({ message: "Alert added successfully", data: record });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Acknowledge an Alert
exports.acknowledgeAlert = async (req, res) => {
  try {
    const { patientId, alertId } = req.params;

    const record = await PatientMonitoringService.findOneAndUpdate(
      { patientId, "alerts.alertId": alertId },
      { $set: { "alerts.$.acknowledged": true } },
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ message: "Alert not found" });
    }

    res.status(200).json({ message: "Alert acknowledged successfully", data: record });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a Note to a Patient Record
exports.addNoteToMonitoringRecord = async (req, res) => {
  try {
    const { patientId } = req.params;
    const note = req.body;

    const record = await PatientMonitoringService.findOneAndUpdate(
      { patientId },
      { $push: { notes: note } },
      { new: true, runValidators: true }
    );

    if (!record) {
      return res.status(404).json({ message: "Monitoring record not found" });
    }

    res.status(200).json({ message: "Note added successfully", data: record });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
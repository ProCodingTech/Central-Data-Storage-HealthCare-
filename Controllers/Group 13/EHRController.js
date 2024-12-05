const EHRService = require("../models/EHRService.schema");

// Create a New EHR Record
exports.createEHR = async (req, res) => {
  try {
    const ehrData = req.body;

    const newEHR = new EHRService(ehrData);
    const savedEHR = await newEHR.save();

    res.status(201).json({ message: "EHR record created successfully", data: savedEHR });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All EHR Records
exports.getAllEHRs = async (req, res) => {
  try {
    const ehrs = await EHRService.find();
    res.status(200).json(ehrs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get EHR Record by Patient ID
exports.getEHRByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    const ehr = await EHRService.findOne({ patientId });

    if (!ehr) {
      return res.status(404).json({ message: "EHR record not found" });
    }

    res.status(200).json(ehr);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update EHR Record by Patient ID
exports.updateEHRByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const updates = req.body;

    const updatedEHR = await EHRService.findOneAndUpdate(
      { patientId },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedEHR) {
      return res.status(404).json({ message: "EHR record not found" });
    }

    res.status(200).json({ message: "EHR record updated successfully", data: updatedEHR });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete EHR Record by Patient ID
exports.deleteEHRByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    const deletedEHR = await EHRService.findOneAndDelete({ patientId });

    if (!deletedEHR) {
      return res.status(404).json({ message: "EHR record not found" });
    }

    res.status(200).json({ message: "EHR record deleted successfully", data: deletedEHR });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get EHR Record by Message ID (MSH.messageId)
exports.getEHRByMessageId = async (req, res) => {
  try {
    const { messageId } = req.params;

    const ehr = await EHRService.findOne({ "MSH.messageId": messageId });

    if (!ehr) {
      return res.status(404).json({ message: "EHR record not found" });
    }

    res.status(200).json(ehr);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
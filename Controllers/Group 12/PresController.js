const PrescriptionService = require("../models/PrescriptionService");

// Create a New Prescription
exports.createPrescription = async (req, res) => {
  try {
    const { prescriptionId, patientId, medications, status } = req.body;

    const newPrescription = new PrescriptionService({
      prescriptionId,
      patientId,
      medications,
      status,
    });

    const savedPrescription = await newPrescription.save();
    res.status(201).json({ message: "Prescription created successfully", data: savedPrescription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Prescriptions
exports.getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await PrescriptionService.find();
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Prescription by ID
exports.getPrescriptionById = async (req, res) => {
  try {
    const { prescriptionId } = req.params;

    const prescription = await PrescriptionService.findOne({ prescriptionId });

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.status(200).json(prescription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Prescription
exports.updatePrescription = async (req, res) => {
  try {
    const { prescriptionId } = req.params;
    const updates = req.body;

    const updatedPrescription = await PrescriptionService.findOneAndUpdate(
      { prescriptionId },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedPrescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.status(200).json({ message: "Prescription updated successfully", data: updatedPrescription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Prescription Status
exports.updatePrescriptionStatus = async (req, res) => {
  try {
    const { prescriptionId } = req.params;
    const { status } = req.body;

    if (!["Pending", "Fulfilled", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedPrescription = await PrescriptionService.findOneAndUpdate(
      { prescriptionId },
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedPrescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.status(200).json({ message: "Prescription status updated successfully", data: updatedPrescription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Prescription
exports.deletePrescription = async (req, res) => {
  try {
    const { prescriptionId } = req.params;

    const deletedPrescription = await PrescriptionService.findOneAndDelete({ prescriptionId });

    if (!deletedPrescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    res.status(200).json({ message: "Prescription deleted successfully", data: deletedPrescription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
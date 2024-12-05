const MedicalBillingAndInsurance = require('../../Models/Group 9/Billing.schema');

// Create a new Medical Billing and Insurance record
const createMedicalBillingAndInsurance = async (req, res) => {
  try {
    const data = req.body;
    const newRecord = new MedicalBillingAndInsurance(data);
    await newRecord.save();
    res.status(201).json({ message: "Record created successfully", data: newRecord });
  } catch (error) {
    res.status(500).json({ message: "Error creating record", error: error.message });
  }
};

// Get all Medical Billing and Insurance records
const getAllMedicalBillingAndInsurance = async (req, res) => {
  try {
    const records = await MedicalBillingAndInsurance.find();
    res.status(200).json({ message: "Records fetched successfully", data: records });
  } catch (error) {
    res.status(500).json({ message: "Error fetching records", error: error.message });
  }
};

// Get a specific Medical Billing and Insurance record by ID
const getMedicalBillingAndInsuranceById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await MedicalBillingAndInsurance.findById(id);
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.status(200).json({ message: "Record fetched successfully", data: record });
  } catch (error) {
    res.status(500).json({ message: "Error fetching record", error: error.message });
  }
};

// Update a Medical Billing and Insurance record
const updateMedicalBillingAndInsurance = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedRecord = await MedicalBillingAndInsurance.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedRecord) return res.status(404).json({ message: "Record not found" });
    res.status(200).json({ message: "Record updated successfully", data: updatedRecord });
  } catch (error) {
    res.status(500).json({ message: "Error updating record", error: error.message });
  }
};

// Delete a Medical Billing and Insurance record
const deleteMedicalBillingAndInsurance = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecord = await MedicalBillingAndInsurance.findByIdAndDelete(id);
    if (!deletedRecord) return res.status(404).json({ message: "Record not found" });
    res.status(200).json({ message: "Record deleted successfully", data: deletedRecord });
  } catch (error) {
    res.status(500).json({ message: "Error deleting record", error: error.message });
  }
};

// Fetch financial report details
const getFinancialReport = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await MedicalBillingAndInsurance.findById(id).select('financialReport');
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.status(200).json({ message: "Financial report fetched successfully", data: record.financialReport });
  } catch (error) {
    res.status(500).json({ message: "Error fetching financial report", error: error.message });
  }
};

// Update payment status
const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;
    const record = await MedicalBillingAndInsurance.findById(id);
    if (!record) return res.status(404).json({ message: "Record not found" });

    record.payment.status = paymentStatus;
    record.payment.updatedAt = new Date();
    await record.save();
    res.status(200).json({ message: "Payment status updated successfully", data: record.payment });
  } catch (error) {
    res.status(500).json({ message: "Error updating payment status", error: error.message });
  }
};

module.exports = {
    createMedicalBillingAndInsurance,
    getAllMedicalBillingAndInsurance,
    getMedicalBillingAndInsuranceById,
    updateMedicalBillingAndInsurance,
    deleteMedicalBillingAndInsurance,
    getFinancialReport,
    updatePaymentStatus
}
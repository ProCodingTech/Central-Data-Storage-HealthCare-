const BillingService = require("../models/BillingService");

// Create a new billing record
exports.createBilling = async (req, res) => {
  try {
    const { billingId, prescriptionId, insuranceId, totalAmount, amountPaid, status, billingDate } = req.body;

    const newBilling = new BillingService({
      billingId,
      prescriptionId,
      insuranceId,
      totalAmount,
      amountPaid,
      status,
      billingDate,
    });

    const savedBilling = await newBilling.save();
    res.status(201).json({ message: "Billing record created successfully", data: savedBilling });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all billing records
exports.getAllBillingRecords = async (req, res) => {
  try {
    const billingRecords = await BillingService.find();
    res.status(200).json(billingRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a billing record by ID
exports.getBillingById = async (req, res) => {
  try {
    const { id } = req.params;
    const billingRecord = await BillingService.findById(id);

    if (!billingRecord) {
      return res.status(404).json({ message: "Billing record not found" });
    }

    res.status(200).json(billingRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a billing record
exports.updateBilling = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedBilling = await BillingService.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedBilling) {
      return res.status(404).json({ message: "Billing record not found" });
    }

    res.status(200).json({ message: "Billing record updated successfully", data: updatedBilling });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a billing record
exports.deleteBilling = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBilling = await BillingService.findByIdAndDelete(id);

    if (!deletedBilling) {
      return res.status(404).json({ message: "Billing record not found" });
    }

    res.status(200).json({ message: "Billing record deleted successfully", data: deletedBilling });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get billing records by status
exports.getBillingByStatus = async (req, res) => {
  try {
    const { status } = req.query;

    if (!["Pending", "Paid", "Declined"].includes(status)) {
      return res.status(400).json({ message: "Invalid status provided" });
    }

    const billingRecords = await BillingService.find({ status });
    res.status(200).json(billingRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get unpaid or partially paid bills
exports.getOutstandingBills = async (req, res) => {
  try {
    const billingRecords = await BillingService.find({
      totalAmount: { $gt: 0 },
      $expr: { $gt: ["$totalAmount", "$amountPaid"] },
    });
    res.status(200).json(billingRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
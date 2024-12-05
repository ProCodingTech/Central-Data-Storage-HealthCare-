const Analytics = require("../models/Analytics");

// Create a new analytics record
exports.createAnalytics = async (req, res) => {
  try {
    const {
      pharmacyId,
      reportMonth,
      reportYear,
      reportDate,
      medicationUsageReport,
      prescriptionTrends,
      totalPrescriptionsProcessed,
    } = req.body;

    const newAnalytics = new Analytics({
      pharmacyId,
      reportMonth,
      reportYear,
      reportDate,
      medicationUsageReport,
      prescriptionTrends,
      totalPrescriptionsProcessed,
    });

    const savedAnalytics = await newAnalytics.save();
    res.status(201).json({ message: "Analytics report created successfully", data: savedAnalytics });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all analytics records
exports.getAllAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.find().populate("pharmacyId").populate("medicationUsageReport.medicationId").populate("prescriptionTrends.medicationId");
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get analytics record by ID
exports.getAnalyticsById = async (req, res) => {
  try {
    const { id } = req.params;
    const analytics = await Analytics.findById(id)
      .populate("pharmacyId")
      .populate("medicationUsageReport.medicationId")
      .populate("prescriptionTrends.medicationId");

    if (!analytics) {
      return res.status(404).json({ message: "Analytics report not found" });
    }

    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an analytics record
exports.updateAnalytics = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedAnalytics = await Analytics.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate("pharmacyId").populate("medicationUsageReport.medicationId").populate("prescriptionTrends.medicationId");

    if (!updatedAnalytics) {
      return res.status(404).json({ message: "Analytics report not found" });
    }

    res.status(200).json({ message: "Analytics report updated successfully", data: updatedAnalytics });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an analytics record
exports.deleteAnalytics = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAnalytics = await Analytics.findByIdAndDelete(id);

    if (!deletedAnalytics) {
      return res.status(404).json({ message: "Analytics report not found" });
    }

    res.status(200).json({ message: "Analytics report deleted successfully", data: deletedAnalytics });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get analytics for a specific pharmacy by month and year
exports.getAnalyticsByPharmacyAndDate = async (req, res) => {
  try {
    const { pharmacyId, reportMonth, reportYear } = req.query;

    const analytics = await Analytics.findOne({ pharmacyId, reportMonth, reportYear })
      .populate("pharmacyId")
      .populate("medicationUsageReport.medicationId")
      .populate("prescriptionTrends.medicationId");

    if (!analytics) {
      return res.status(404).json({ message: "No analytics report found for the specified pharmacy and date" });
    }

    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
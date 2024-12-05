import { BaseReport, PatientHealthReport, TreatmentOutcomeReport, HospitalOperationsReport, FinancialAnalyticsReport } from '../../Models/Group 8/HealthAnalyst.schema';

// Helper function to get the correct model based on report type
const getModelByReportType = (type) => {
  switch (type) {
    case 'PATIENT_HEALTH':
      return PatientHealthReport;
    case 'TREATMENT_OUTCOME':
      return TreatmentOutcomeReport;
    case 'HOSPITAL_OPERATIONS':
      return HospitalOperationsReport;
    case 'FINANCIAL_ANALYTICS':
      return FinancialAnalyticsReport;
    default:
      return BaseReport;
  }
};

// Get all reports
const getAllReports = async (req, res) => {
  try {
    const reports = await BaseReport.find();
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving reports', error: err.message });
  }
};

// Get a report by ID
const getReportById = async (req, res) => {
  const { id } = req.params;
  try {
    const report = await BaseReport.findById(id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving report', error: err.message });
  }
};

// Create a new report
const createReport = async (req, res) => {
  const { reportType } = req.body;
  const ReportModel = getModelByReportType(reportType);

  try {
    const newReport = new ReportModel(req.body);
    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (err) {
    res.status(500).json({ message: 'Error creating report', error: err.message });
  }
};

// Update a report
const updateReport = async (req, res) => {
  const { id } = req.params;
  const { reportType } = req.body;
  const ReportModel = getModelByReportType(reportType);

  try {
    const updatedReport = await ReportModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json(updatedReport);
  } catch (err) {
    res.status(500).json({ message: 'Error updating report', error: err.message });
  }
};

// Delete a report
const deleteReport = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReport = await BaseReport.findByIdAndDelete(id);
    if (!deletedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting report', error: err.message });
  }
};

module.exports = {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport
}
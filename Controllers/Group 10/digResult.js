const DiagnosisResult = require('../models/DiagnosisResult');

// Create a new diagnosis result
const createDiagnosisResult = async (req, res) => {
  try {
    const { resultId, patientId, modelId, diagnosisDate, diagnosisOutcome, explanation } = req.body;

    const newResult = new DiagnosisResult({
      resultId,
      patientId,
      modelId,
      diagnosisDate,
      diagnosisOutcome,
      explanation,
    });

    const savedResult = await newResult.save();
    res.status(201).json({ message: 'Diagnosis result created successfully', data: savedResult });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all diagnosis results
const getAllDiagnosisResults = async (req, res) => {
  try {
    const results = await DiagnosisResult.find();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a diagnosis result by resultId
const getDiagnosisResultById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await DiagnosisResult.findOne({ resultId: id });

    if (!result) {
      return res.status(404).json({ message: 'Diagnosis result not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a diagnosis result
const updateDiagnosisResult = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedResult = await DiagnosisResult.findOneAndUpdate(
      { resultId: id },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedResult) {
      return res.status(404).json({ message: 'Diagnosis result not found' });
    }

    res.status(200).json({ message: 'Diagnosis result updated successfully', data: updatedResult });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a diagnosis result
const deleteDiagnosisResult = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedResult = await DiagnosisResult.findOneAndDelete({ resultId: id });

    if (!deletedResult) {
      return res.status(404).json({ message: 'Diagnosis result not found' });
    }

    res.status(200).json({ message: 'Diagnosis result deleted successfully', data: deletedResult });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    createDiagnosisResult,
    getAllDiagnosisResults,
    getDiagnosisResultById,
    updateDiagnosisResult,
    deleteDiagnosisResult
}
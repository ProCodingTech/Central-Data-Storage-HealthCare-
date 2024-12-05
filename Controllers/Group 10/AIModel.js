const AIDiagnosticModel = require('../../Models/Group 10/Diagnostic.schema');

// Create a new AI diagnostic model
const createModel = async (req, res) => {
  try {
    const { modelId, modelName, modelType, modelFile, explanation, status } = req.body;

    // Create a new AI Diagnostic Model
    const newModel = new AIDiagnosticModel({
      modelId,
      modelName,
      modelType,
      modelFile,
      explanation,
      status,
    });

    const savedModel = await newModel.save();
    res.status(201).json({ message: 'AI Diagnostic Model created successfully', data: savedModel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all AI diagnostic models
const getAllModels = async (req, res) => {
  try {
    const models = await AIDiagnosticModel.find();
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an AI diagnostic model by ID
const getModelById = async (req, res) => {
  try {
    const { id } = req.params;
    const model = await AIDiagnosticModel.findOne({ modelId: id });

    if (!model) {
      return res.status(404).json({ message: 'AI Diagnostic Model not found' });
    }

    res.status(200).json(model);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an AI diagnostic model
const updateModel = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedModel = await AIDiagnosticModel.findOneAndUpdate(
      { modelId: id },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedModel) {
      return res.status(404).json({ message: 'AI Diagnostic Model not found' });
    }

    res.status(200).json({ message: 'AI Diagnostic Model updated successfully', data: updatedModel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an AI diagnostic model
const deleteModel = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedModel = await AIDiagnosticModel.findOneAndDelete({ modelId: id });

    if (!deletedModel) {
      return res.status(404).json({ message: 'AI Diagnostic Model not found' });
    }

    res.status(200).json({ message: 'AI Diagnostic Model deleted successfully', data: deletedModel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    createModel,
    getAllModels,
    getModelById,
    updateModel,
    deleteModel
}
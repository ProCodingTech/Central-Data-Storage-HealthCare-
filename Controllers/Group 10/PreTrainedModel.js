const PreTrainedModel = require('../models/PreTrainedModel');

// Create a new pre-trained model
const createPreTrainedModel = async (req, res) => {
  try {
    const { modelId, modelName, modelFile, metaData } = req.body;

    const newModel = new PreTrainedModel({
      modelId,
      modelName,
      modelFile,
      metaData,
    });

    const savedModel = await newModel.save();
    res.status(201).json({ message: 'Pre-Trained Model created successfully', data: savedModel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all pre-trained models
const getAllPreTrainedModels = async (req, res) => {
  try {
    const models = await PreTrainedModel.find();
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a pre-trained model by ID
const getPreTrainedModelById = async (req, res) => {
  try {
    const { id } = req.params;
    const model = await PreTrainedModel.findOne({ modelId: id });

    if (!model) {
      return res.status(404).json({ message: 'Pre-Trained Model not found' });
    }

    res.status(200).json(model);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a pre-trained model
const updatePreTrainedModel = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedModel = await PreTrainedModel.findOneAndUpdate(
      { modelId: id },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedModel) {
      return res.status(404).json({ message: 'Pre-Trained Model not found' });
    }

    res.status(200).json({ message: 'Pre-Trained Model updated successfully', data: updatedModel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a pre-trained model
const deletePreTrainedModel = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedModel = await PreTrainedModel.findOneAndDelete({ modelId: id });

    if (!deletedModel) {
      return res.status(404).json({ message: 'Pre-Trained Model not found' });
    }

    res.status(200).json({ message: 'Pre-Trained Model deleted successfully', data: deletedModel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    createPreTrainedModel,
    getAllPreTrainedModels,
    getPreTrainedModelById,
    updatePreTrainedModel,
    deletePreTrainedModel
}
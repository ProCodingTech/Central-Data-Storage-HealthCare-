const TrainingData = require('../models/TrainingData');

// Create a new training data entry
const createTrainingData = async (req, res) => {
  try {
    const { trainingDataId, modelId, dataFiles } = req.body;

    const newTrainingData = new TrainingData({
      trainingDataId,
      modelId,
      dataFiles,
    });

    const savedTrainingData = await newTrainingData.save();
    res.status(201).json({ message: 'Training data created successfully', data: savedTrainingData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all training data entries
const getAllTrainingData = async (req, res) => {
  try {
    const trainingData = await TrainingData.find();
    res.status(200).json(trainingData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a training data entry by trainingDataId
const getTrainingDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const trainingData = await TrainingData.findOne({ trainingDataId: id });

    if (!trainingData) {
      return res.status(404).json({ message: 'Training data not found' });
    }

    res.status(200).json(trainingData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a training data entry
const updateTrainingData = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedTrainingData = await TrainingData.findOneAndUpdate(
      { trainingDataId: id },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedTrainingData) {
      return res.status(404).json({ message: 'Training data not found' });
    }

    res.status(200).json({ message: 'Training data updated successfully', data: updatedTrainingData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a training data entry
const deleteTrainingData = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTrainingData = await TrainingData.findOneAndDelete({ trainingDataId: id });

    if (!deletedTrainingData) {
      return res.status(404).json({ message: 'Training data not found' });
    }

    res.status(200).json({ message: 'Training data deleted successfully', data: deletedTrainingData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    createTrainingData,
    getAllTrainingData,
    getTrainingDataById,
    updateTrainingData,
    deleteTrainingData
}
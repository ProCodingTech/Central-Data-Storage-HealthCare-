const LabDiagnosticCenterSystem = require('../../Models/Group 7/Lab.schema');

// Get all data
const getAllLabData = async (req, res) => {
  try {
    const data = await LabDiagnosticCenterSystem.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving data', error: err.message });
  }
};

// Get data by ID
const getLabDataById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await LabDiagnosticCenterSystem.findById(id);
    if (!data) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving data', error: err.message });
  }
};

// Create new data (POST)
const createLabData = async (req, res) => {
  const newData = new LabDiagnosticCenterSystem(req.body);
  try {
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (err) {
    res.status(500).json({ message: 'Error creating data', error: err.message });
  }
};

// Update existing data (PUT)
const updateLabData = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedData = await LabDiagnosticCenterSystem.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedData) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.status(200).json(updatedData);
  } catch (err) {
    res.status(500).json({ message: 'Error updating data', error: err.message });
  }
};

// Delete data by ID
const deleteLabData = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedData = await LabDiagnosticCenterSystem.findByIdAndDelete(id);
    if (!deletedData) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.status(200).json({ message: 'Data deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting data', error: err.message });
  }
};

module.exports = {
  getAllLabData,
  getLabDataById,
  createLabData,
  updateLabData,
  deleteLabData
}
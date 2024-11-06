const HealthTracking = require('../../Models/Group 4/HTracking.schema');

// Get all health tracking records
const getAllHealthTracking = async (req, res) => {
  try {
    const healthTrackingRecords = await HealthTracking.find();
    res.status(200).json(healthTrackingRecords);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching health tracking records', error });
  }
};

// Create a new health tracking entry
const createHealthTracking = async (req, res) => {
  const { tracking_id, user_id, symptom_details, medication, date_recorded, next_reminder } = req.body;

  const newHealthTracking = new HealthTracking({
    tracking_id,
    user_id,
    symptom_details,
    medication,
    date_recorded,
    next_reminder,
  });

  try {
    const savedHealthTracking = await newHealthTracking.save();
    res.status(201).json(savedHealthTracking);
  } catch (error) {
    res.status(400).json({ message: 'Error creating health tracking entry', error });
  }
};

// Delete health tracking by ID
const deleteHealthTrackingById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedHealthTracking = await HealthTracking.findByIdAndDelete(id);
    if (!deletedHealthTracking) {
      return res.status(404).json({ message: 'Health tracking record not found' });
    }
    res.status(200).json({ message: 'Health tracking record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting health tracking record', error });
  }
};

module.exports = {
  getAllHealthTracking,
  createHealthTracking,
  deleteHealthTrackingById,
};

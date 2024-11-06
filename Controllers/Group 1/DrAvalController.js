const DoctorAvailability = require('../../Models/Group 1/DrAvalibility.schema');

// Get all availabilities
const getAllAvailabilities = async (req, res) => {
  try {
    const availabilities = await DoctorAvailability.find();
    res.status(200).json(availabilities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching availabilities', error });
  }
};

// Create a new availability entry
const createAvailability = async (req, res) => {
  const { doctorId, days } = req.body;

  // Validate input fields if needed

  const newAvailability = new DoctorAvailability({
    doctorId,
    days,
  });

  try {
    const savedAvailability = await newAvailability.save();
    res.status(201).json(savedAvailability);
  } catch (error) {
    res.status(400).json({ message: 'Error creating availability', error });
  }
};

// Delete an availability entry by ID
const deleteAvailabilityById = async (req, res) => {
  const { id } = req.params.id;

  try {
    const deletedAvailability = await DoctorAvailability.findByIdAndDelete(id);
    if (!deletedAvailability) {
      return res.status(404).json({ message: 'Availability not found' });
    }
    res.status(200).json({ message: 'Availability deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting availability', error });
  }
};

module.exports = {
  getAllAvailabilities,
  createAvailability,
  deleteAvailabilityById
}
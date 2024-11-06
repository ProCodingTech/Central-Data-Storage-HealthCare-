const Nurse = require('../../Models/Group 2/Nurse.schema');

// Get all nurses
const getAllNurses = async (req, res) => {
  try {
    const nurses = await Nurse.find();
    res.status(200).json(nurses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching nurses', error });
  }
};

// Create a new nurse entry
const createNurse = async (req, res) => {
  const { name, dateOfBirth, sex, address, phoneNumber, email, hospitalAffiliation, yearsOfExperience, certifications, shiftSchedule, patientsAssigned, labTestsAssisted } = req.body;

  const newNurse = new Nurse({
    name,
    dateOfBirth,
    sex,
    address,
    phoneNumber,
    email,
    hospitalAffiliation,
    yearsOfExperience,
    certifications,
    shiftSchedule,
    patientsAssigned,
    labTestsAssisted,
  });

  try {
    const savedNurse = await newNurse.save();
    res.status(201).json(savedNurse);
  } catch (error) {
    res.status(400).json({ message: 'Error creating nurse entry', error });
  }
};

// Delete a nurse by ID
const deleteNurseById = async (req, res) => {
  const { id } = req.params.id;

  try {
    const deletedNurse = await Nurse.findByIdAndDelete(id);
    if (!deletedNurse) {
      return res.status(404).json({ message: 'Nurse not found' });
    }
    res.status(200).json({ message: 'Nurse deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting nurse', error });
  }
};

module.exports = {
  getAllNurses,
  createNurse,
  deleteNurseById,
};

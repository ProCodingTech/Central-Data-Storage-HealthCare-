const Patient = require('../../Models/Group 2/Patient.schema');

// Get all patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error });
  }
};

// Create a new patient entry
const createPatient = async (req, res) => {
  const {
    name,
    dateOfBirth,
    sex,
    age,
    address,
    bloodType,
    insurance,
    family,
    receivable,
    primaryCareDoctor,
    emergencyContact,
    diseases,
    evaluations,
    surgeries,
    geneticRisks,
    labTests,
    medications,
    vaccinations
  } = req.body;

  const newPatient = new Patient({
    name,
    dateOfBirth,
    sex,
    age,
    address,
    bloodType,
    insurance,
    family,
    receivable,
    primaryCareDoctor,
    emergencyContact,
    diseases,
    evaluations,
    surgeries,
    geneticRisks,
    labTests,
    medications,
    vaccinations,
  });

  try {
    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(400).json({ message: 'Error creating patient entry', error });
  }
};

// Delete a patient by ID
const deletePatientById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPatient = await Patient.findByIdAndDelete(id);
    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting patient', error });
  }
};

module.exports = {
  getAllPatients,
  createPatient,
  deletePatientById,
};
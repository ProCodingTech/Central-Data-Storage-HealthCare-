const Doctor = require('../../Models/Group 2/Doctor.schema');

// Get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error });
  }
};

// Create a new doctor entry
const createDoctor = async (req, res) => {
  const { name, dateOfBirth, sex, address, phoneNumber, email, specialization, licenseNumber, yearsOfExperience, hospitalAffiliations, consultations, labTestsOrdered, surgeriesPerformed, certifications, availability } = req.body;

  const newDoctor = new Doctor({
    name,
    dateOfBirth,
    sex,
    address,
    phoneNumber,
    email,
    specialization,
    licenseNumber,
    yearsOfExperience,
    hospitalAffiliations,
    consultations,
    labTestsOrdered,
    surgeriesPerformed,
    certifications,
    availability,
  });

  try {
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(400).json({ message: 'Error creating doctor entry', error });
  }
};

// Delete a doctor by ID
const deleteDoctorById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(id);
    if (!deletedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting doctor', error });
  }
};

module.exports = {
  getAllDoctors,
  createDoctor,
  deleteDoctorById,
};

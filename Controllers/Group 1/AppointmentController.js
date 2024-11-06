const DoctorAppointment = require('../../Models/Group 1/Appointment.schema');

// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await DoctorAppointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};

// Create a new appointment
const createAppointment = async (req, res) => {
  const { addedByUserId, timeStart, timeEnd, doctorId, patientId, status } = req.body;

  // Validate input fields if needed

  const newAppointment = new DoctorAppointment({
    addedByUserId,
    timeStart,
    timeEnd,
    doctorId,
    patientId,
    status,
  });

  try {
    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ message: 'Error creating appointment', error });
  }
};

// Delete an appointment by ID
const deleteAppointmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAppointment = await DoctorAppointment.findByIdAndDelete(id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment', error });
  }
};

module.exports = {
  getAllAppointments,
  createAppointment,
  deleteAppointmentById
}
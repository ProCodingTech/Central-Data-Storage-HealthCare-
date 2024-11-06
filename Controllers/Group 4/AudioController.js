const AudioCall = require('../../Models/Group 4/AudioCall.schema');

// Get all audio calls
const getAllAudioCalls = async (req, res) => {
  try {
    const audioCalls = await AudioCall.find();
    res.status(200).json(audioCalls);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching audio calls', error });
  }
};

// Create a new audio call entry
const createAudioCall = async (req, res) => {
  const { call_id, caller_id, receiver_id, started_at, ended_at, call_duration, is_successful, is_recorded, recording_url } = req.body;

  const newAudioCall = new AudioCall({
    call_id,
    caller_id,
    receiver_id,
    started_at,
    ended_at,
    call_duration,
    is_successful,
    is_recorded,
    recording_url,
  });

  try {
    const savedAudioCall = await newAudioCall.save();
    res.status(201).json(savedAudioCall);
  } catch (error) {
    res.status(400).json({ message: 'Error creating audio call entry', error });
  }
};

// Delete an audio call by ID
const deleteAudioCallById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAudioCall = await AudioCall.findByIdAndDelete(id);
    if (!deletedAudioCall) {
      return res.status(404).json({ message: 'Audio call not found' });
    }
    res.status(200).json({ message: 'Audio call deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting audio call', error });
  }
};

module.exports = {
  getAllAudioCalls,
  createAudioCall,
  deleteAudioCallById,
};
const Feedback = require('../../Models/Group 4/Feedback.schema');

// Get all feedback records
const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback records', error });
  }
};

// Create a new feedback entry
const createFeedback = async (req, res) => {
  const { feedback_id, user_id, provider_id, feedback_text, rating, submitted_at } = req.body;

  const newFeedback = new Feedback({
    feedback_id,
    user_id,
    provider_id,
    feedback_text,
    rating,
    submitted_at,
  });

  try {
    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(400).json({ message: 'Error creating feedback entry', error });
  }
};

// Delete feedback by ID
const deleteFeedbackById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(id);
    if (!deletedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting feedback', error });
  }
};

module.exports = {
  getAllFeedback,
  createFeedback,
  deleteFeedbackById,
};
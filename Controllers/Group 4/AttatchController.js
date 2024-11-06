const Attachment = require('../../Models/Group 4/Attatchments.schema');

// Get all attachments
const getAllAttachments = async (req, res) => {
  try {
    const attachments = await Attachment.find();
    res.status(200).json(attachments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attachments', error });
  }
};

// Create a new attachment entry
const createAttachment = async (req, res) => {
  const { attachment_id, attached_to_id, type, file_url, uploaded_at } = req.body;

  const newAttachment = new Attachment({
    attachment_id,
    attached_to_id,
    type,
    file_url,
    uploaded_at,
  });

  try {
    const savedAttachment = await newAttachment.save();
    res.status(201).json(savedAttachment);
  } catch (error) {
    res.status(400).json({ message: 'Error creating attachment entry', error });
  }
};

// Delete an attachment by ID
const deleteAttachmentById = async (req, res) => {
  const { id } = req.params.id;

  try {
    const deletedAttachment = await Attachment.findByIdAndDelete(id);
    if (!deletedAttachment) {
      return res.status(404).json({ message: 'Attachment not found' });
    }
    res.status(200).json({ message: 'Attachment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting attachment', error });
  }
};

module.exports = {
  getAllAttachments,
  createAttachment,
  deleteAttachmentById,
};
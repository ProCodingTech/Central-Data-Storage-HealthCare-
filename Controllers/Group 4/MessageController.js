const Message = require('../../Models/Group 4/Message.schema');

// Get all messages by chat_id
const getAllMessages = async (req, res) => {
  const { chat_id } = req.params;

  try {
    const messages = await Message.find({ chat_id });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
};

// Create a new message
const createMessage = async (req, res) => {
  const { message_id, chat_id, sender_id, message_text, media_url, created_at, is_read } = req.body;

  const newMessage = new Message({
    message_id,
    chat_id,
    sender_id,
    message_text,
    media_url,
    created_at,
    is_read,
  });

  try {
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(400).json({ message: 'Error creating message', error });
  }
};

// Delete message by message_id
const deleteMessageById = async (req, res) => {
  const { message_id } = req.params;

  try {
    const deletedMessage = await Message.findOneAndDelete({ message_id });
    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message', error });
  }
};

module.exports = {
  getAllMessages,
  createMessage,
  deleteMessageById,
};
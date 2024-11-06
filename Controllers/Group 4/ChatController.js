const Chat = require('../../Models/Group 4/Chat.schema');

// Get all chat records
const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find();
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chats', error });
  }
};

// Create a new chat entry
const createChat = async (req, res) => {
  const { chat_id, participant_1, participant_2, created_at, last_message_at } = req.body;

  const newChat = new Chat({
    chat_id,
    participant_1,
    participant_2,
    created_at,
    last_message_at,
  });

  try {
    const savedChat = await newChat.save();
    res.status(201).json(savedChat);
  } catch (error) {
    res.status(400).json({ message: 'Error creating chat entry', error });
  }
};

// Delete a chat by ID
const deleteChatById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedChat = await Chat.findByIdAndDelete(id);
    if (!deletedChat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    res.status(200).json({ message: 'Chat deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting chat', error });
  }
};

module.exports = {
  getAllChats,
  createChat,
  deleteChatById,
};
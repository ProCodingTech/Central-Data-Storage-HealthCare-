const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  chat_id: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/ // UUID format
  },
  participant_1: { 
    type: String, 
    required: true, 
    match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/ // UUID format
  },
  participant_2: { 
    type: String, 
    required: true, 
    match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/ // UUID format
  },
  created_at: { 
    type: Date, 
    required: true 
  },
  last_message_at: { 
    type: Date 
  }
}, {
  timestamps: true,
  versionKey: false
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
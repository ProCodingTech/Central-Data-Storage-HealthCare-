const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message_id: { 
      type: String, 
      required: true, 
      unique: true, 
      match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/ // UUID format
    },
    chat_id: { 
      type: String, 
      required: true, 
      match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/ // UUID format
    },
    sender_id: { 
      type: String, 
      required: true, 
      match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/ // UUID format
    },
    message_text: { 
      type: String, 
      required: true 
    },
    media_url: { 
      type: String 
    },
    created_at: { 
      type: Date, 
      required: true 
    },
    is_read: { 
      type: Boolean, 
      default: false 
    }
  }, {
    timestamps: true,
    versionKey: false
  });

const MessageSchema = mongoose.model('MessageSchema', messageSchema);
module.exports = MessageSchema;
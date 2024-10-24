const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
    attachment_id: { 
      type: String, 
      required: true, 
      unique: true, 
      match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/ // UUID format
    },
    attached_to_id: { 
      type: String, 
      required: true, 
      match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/ // UUID format
    },
    type: { 
      type: String 
    },
    file_url: { 
      type: String, 
      required: true 
    },
    uploaded_at: { 
      type: Date, 
      required: true 
    }
  }, {
    timestamps: true,
    versionKey: false
});

const Attachment = mongoose.model('Attachment', attachmentSchema);
module.exports = Attachment;
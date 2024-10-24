const mongoose = require('mongoose');

const audioCallSchema = new mongoose.Schema({
    call_id: { 
      type: String, 
      required: true, 
      unique: true, 
      match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/ // UUID format
    },
    caller_id: { 
      type: String, 
      required: true, 
      match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/ // UUID format
    },
    receiver_id: { 
      type: String, 
      required: true, 
      match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/ // UUID format
    },
    started_at: { 
      type: Date, 
      required: true 
    },
    ended_at: { 
      type: Date 
    },
    call_duration: { 
      type: Number, 
      min: 0 // Duration should be non-negative
    },
    is_successful: { 
      type: Boolean 
    },
    is_recorded: { 
      type: Boolean 
    },
    recording_url: { 
      type: String 
    }
  }, {
    timestamps: true,
    versionKey: false
  });

const AudioCall = mongoose.model('AudioCall', audioCallSchema);
module.exports = AudioCall;
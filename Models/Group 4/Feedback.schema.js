const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    feedback_id: { 
      type: String, 
      required: true, 
      unique: true, 
      match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/ // UUID format
    },
    user_id: { 
      type: String, 
      required: true, 
      match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/ // UUID format
    },
    provider_id: { 
      type: String, 
      required: true, 
      match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/ // UUID format
    },
    feedback_text: { 
      type: String, 
      required: true 
    },
    rating: { 
      type: Number, 
      min: 1, 
      max: 5 // Assuming a rating scale of 1 to 5
    },
    submitted_at: { 
      type: Date, 
      required: true 
    }
  }, {
    timestamps: true,
    versionKey: false
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
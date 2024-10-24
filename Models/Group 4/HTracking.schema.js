const mongoose = require('mongoose');

const healthTrackingSchema = new mongoose.Schema({
    tracking_id: { 
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
    symptom_details: { 
      type: Object 
    },
    medication: { 
      type: Object 
    },
    date_recorded: { 
      type: Date, 
      required: true 
    },
    next_reminder: { 
      type: Date 
    }
  }, {
    timestamps: true,
    versionKey: false
});

const HealthTracking = mongoose.model('HealthTracking', healthTrackingSchema);
module.exports = HealthTracking;
const mongoose = require('mongoose');

const aiDiagnosticModelSchema = new mongoose.Schema({
  modelId: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/ // UUID format
  },
  modelName: { 
    type: String, 
    required: true 
  },
  modelType: { 
    type: String, 
    enum: ["pre-trained", "custom"], 
    required: true 
  },
  modelFile: { 
    type: String, 
    required: true, 
    match: /^(http|https):\/\/.+/ // URI format
  },
  explanation: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ["active", "inactive"], 
    default: "active" 
  }
}, {
  timestamps: true,
  versionKey: false
});

const AIDiagnosticModel = mongoose.model('AIDiagnosticModel', aiDiagnosticModelSchema);
module.exports = AIDiagnosticModel;
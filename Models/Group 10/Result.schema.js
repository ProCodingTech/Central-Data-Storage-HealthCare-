const mongoose = require('mongoose');

const diagnosisResultSchema = new mongoose.Schema({
    resultId: { 
      type: String, 
      required: true, 
      unique: true, 
      match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/ // UUID format
    },
    patientId: { 
      type: String, 
      required: true, 
      match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/ // UUID format
    },
    modelId: { 
      type: String, 
      required: true, 
      match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/ // UUID format
    },
    diagnosisDate: { 
      type: Date, 
      required: true 
    },
    diagnosisOutcome: { 
      type: String, 
      required: true 
    },
    explanation: { 
      type: String 
    }
  }, {
    timestamps: true,
    versionKey: false
});

const DiagnosisResult = mongoose.model('DiagnosisResult', diagnosisResultSchema);
module.exports = DiagnosisResult;
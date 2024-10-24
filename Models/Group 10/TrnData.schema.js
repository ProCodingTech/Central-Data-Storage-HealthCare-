const mongoose = require('mongoose');

const trainingDataSchema = new mongoose.Schema({
    trainingDataId: { 
      type: String, 
      required: true, 
      unique: true, 
      match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/ // UUID format
    },
    modelId: { 
      type: String, 
      required: true, 
      match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/ // UUID format
    },
    dataFiles: { 
      type: String, 
      required: true, 
      match: /^(http|https):\/\/.+/ // URI format
    }
  }, {
    timestamps: true,
    versionKey: false
});

const TrainingData = mongoose.model('TrainingData', trainingDataSchema);
module.exports = TrainingData;
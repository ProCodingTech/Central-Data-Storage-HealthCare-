const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
  role: {
    type: String,
    enum: ["MedicalProfessional", "Administrator", "Patient"],
    required: true,
  },
});

// Medical Professional Schema
const medicalProfessionalSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  uploadedImages: [{
    imageId: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
      match: /^(http|https):\/\/[^ "]+$/, // URI format
    },
    diagnosis: {
      type: String,
      enum: ["AK", "BCC", "BKL", "DF", "MEL", "NV", "SCC", "VASC", "Unknown"],
      required: true,
    },
    uploadDate: {
      type: Date,
      required: true,
    },
  }],
  uploadedModels: [{
    modelId: {
      type: String,
      required: true,
    },
    modelName: {
      type: String,
      required: true,
    },
    modelUrl: {
      type: String,
      required: true,
      match: /^(http|https):\/\/[^ "]+$/, // URI format
    },
    disease: {
      type: String,
      required: true,
    },
    uploadDate: {
      type: Date,
      required: true,
    },
  }],
  uploadedDatasets: [{
    datasetId: {
      type: String,
      required: true,
    },
    datasetName: {
      type: String,
      required: true,
    },
    datasetUrl: {
      type: String,
      required: true,
      match: /^(http|https):\/\/[^ "]+$/, // URI format
    },
    disease: {
      type: String,
      required: true,
    },
    uploadDate: {
      type: Date,
      required: true,
    },
  }],
});

// Administrator Schema
const administratorSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
  role: {
    type: String,
    enum: ["Administrator"],
    required: true,
  },
  manageUsers: {
    type: Boolean,
    required: true,
  },
  manageData: {
    type: Boolean,
    required: true,
  },
  manageModels: {
    type: Boolean,
    required: true,
  },
});

// Patient Schema
const patientSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
  role: {
    type: String,
    enum: ["Patient"],
    required: true,
  },
  diagnosisHistory: [{
    imageId: {
      type: String,
      required: true,
    },
    diagnosis: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  }],
});

// Main Healthcare Module Schema
const MedicalImagingRadiology = new mongoose.Schema({
  user: {
    type: userSchema,
    required: true,
  },
  medicalProfessional: {
    type: medicalProfessionalSchema,
    required: true,
  },
  administrator: {
    type: administratorSchema,
    required: true,
  },
  patient: {
    type: patientSchema,
    required: true,
  },
});

const MedicalImaging = mongoose.model('MedicalImaging&Radiology', MedicalImagingRadiology);
module.exports = MedicalImaging;
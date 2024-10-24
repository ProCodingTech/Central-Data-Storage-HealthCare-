const mongoose = require('mongoose');

const medicineServiceSchema = new mongoose.Schema({
    medicationId: {
      type: String,
      required: true,
      unique: true,
      match: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/, // UUID format
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    sideEffects: [{
      type: String,
    }],
});

const MedicineService = mongoose.model('MedicineService', medicineServiceSchema);
module.exports = MedicineService;
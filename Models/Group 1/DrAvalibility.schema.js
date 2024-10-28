const mongoose = require("mongoose");

// Doctor Availability Schema
const availabilitySchema = new mongoose.Schema(
  {
    doctorId: {
      type: String,
      required: true,
      match: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, // UUID format
    },
    days: [
      {
        day: {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          required: true,
        },
        timeStart: {
          type: String,
          required: true, // Format: HH:mm
        },
        timeEnd: {
          type: String,
          required: true, // Format: HH:mm
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const DoctorAvailability = mongoose.model(
  "DoctorAvailability",
  availabilitySchema
);
module.exports = DoctorAvailability;

const mongoose = require("mongoose");

const SignupSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 4,
      maxlength: 30,
      match: /^[a-zA-Z0-9_]+$/, // Allows only alphanumeric characters and underscores
      description: "Unique username for the user",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Invalid email format"],
      description: "User's email address for communication and login",
    },
    password_hash: {
      type: String,
      required: true,
      minlength: 60, // Assuming bcrypt hash minimum length
      description: "Hashed password for user security",
    },
    role: {
      type: String,
      enum: ["Admin", "Doctor", "Patient"],
      required: true,
      description: "Role assigned to the user",
    },
    created_at: {
      type: Date,
      default: Date.now,
      description: "Timestamp when the account was created",
    },
    is_active: {
      type: Boolean,
      default: true,
      description: "Indicates if the account is active or deactivated",
    },
  },
  {
    timestamps: true,
  }
);

const Signup = mongoose.model("Signup", SignupSchema);
module.exports = Signup;

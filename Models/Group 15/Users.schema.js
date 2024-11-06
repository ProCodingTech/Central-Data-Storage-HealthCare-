const mongoose = require("mongoose");

// User Schema
const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      description: "Unique identifier for the user",
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
      description: "Username of the user",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Invalid email format"],
      description: "User's email address",
    },
    passwordHash: {
      type: String,
      required: true,
      description: "Hashed password for the user",
    },
    roles: {
      type: [String],
      required: true,
      enum: [
        "Patient",
        "Doctor",
        "Nurse",
        "Admin",
        "SuperAdmin",
        "Pharmacist",
        "LabTechnician",
      ],
      description: "Roles assigned to the user",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      required: true,
      default: "active",
      description: "Current status of the user account",
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      description: "Date and time when the user was created",
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      description: "Date and time when the user was last updated",
    },
  },
  {
    timestamps: true,
  }
);

// Admin Schema
const AdminSchema = new mongoose.Schema({
  permissions: {
    type: [String],
    default: [
      "create_user",
      "delete_user",
      "assign_role",
      "grant_permission",
      "view_logs",
    ],
    description: "Permissions specific to admin users",
  },
});

// SuperAdmin Schema
const SuperAdminSchema = new mongoose.Schema({
  permissions: {
    type: [String],
    default: [
      "create_admin",
      "delete_admin",
      "manage_roles",
      "manage_permissions",
      "system_configuration",
    ],
    description: "Permissions specific to superadmin users",
  },
});

// Role Schema
const RoleSchema = new mongoose.Schema(
  {
    roleId: {
      type: String,
      required: true,
      unique: true,
      description: "Unique identifier for the role",
    },
    roleName: {
      type: String,
      enum: [
        "Patient",
        "Doctor",
        "Nurse",
        "Admin",
        "SuperAdmin",
        "Pharmacist",
        "LabTechnician",
      ],
      required: true,
      description: "Name of the role",
    },
    permissions: {
      type: [String],
      default: [],
      description: "Permissions assigned to the role",
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      description: "Date and time when the role was created",
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      description: "Date and time when the role was last updated",
    },
  },
  {
    timestamps: true,
  }
);

// Models with Inheritance for Admin and SuperAdmin
const User = mongoose.model("User", UserSchema);
const Admin = User.discriminator("Admin", AdminSchema);
const SuperAdmin = User.discriminator("SuperAdmin", SuperAdminSchema);
const Role = mongoose.model("Role", RoleSchema);

module.exports = {
  User,
  Admin,
  SuperAdmin,
  Role,
};
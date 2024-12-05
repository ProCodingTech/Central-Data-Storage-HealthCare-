const { User, Admin, SuperAdmin, Role } = require("../models/UserModel"); // Adjust the file path as necessary
const bcrypt = require("bcrypt");

// Utility function to hash passwords
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// User Management

// Create a User
exports.createUser = async (req, res) => {
  try {
    const { id, username, email, password, roles } = req.body;

    const passwordHash = await hashPassword(password);

    const newUser = new User({ id, username, email, passwordHash, roles });
    const savedUser = await newUser.save();

    res.status(201).json({ message: "User created successfully", data: savedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a User by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a User
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.password) {
      updates.passwordHash = await hashPassword(updates.password);
      delete updates.password;
    }

    const updatedUser = await User.findOneAndUpdate({ id }, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a User
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findOneAndDelete({ id });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", data: deletedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Role Management

// Create a Role
exports.createRole = async (req, res) => {
  try {
    const { roleId, roleName, permissions } = req.body;

    const newRole = new Role({ roleId, roleName, permissions });
    const savedRole = await newRole.save();

    res.status(201).json({ message: "Role created successfully", data: savedRole });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Role
exports.updateRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const updates = req.body;

    const updatedRole = await Role.findOneAndUpdate({ roleId }, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({ message: "Role updated successfully", data: updatedRole });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Role
exports.deleteRole = async (req, res) => {
  try {
    const { roleId } = req.params;

    const deletedRole = await Role.findOneAndDelete({ roleId });

    if (!deletedRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({ message: "Role deleted successfully", data: deletedRole });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign Role to User
exports.assignRoleToUser = async (req, res) => {
  try {
    const { id, roleName } = req.params;

    const user = await User.findOneAndUpdate(
      { id },
      { $addToSet: { roles: roleName } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Role assigned successfully", data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Revoke Role from User
exports.revokeRoleFromUser = async (req, res) => {
  try {
    const { id, roleName } = req.params;

    const user = await User.findOneAndUpdate(
      { id },
      { $pull: { roles: roleName } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Role revoked successfully", data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
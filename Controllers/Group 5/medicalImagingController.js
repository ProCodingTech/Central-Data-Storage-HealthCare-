const MedicalImaging = require("../models/medicalImaging");

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await MedicalImaging.findOne({ "user.id": userId });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user details
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    const updatedUser = await MedicalImaging.findOneAndUpdate(
      { "user.id": userId },
      { $set: { user: updateData } },
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.json(updatedUser.user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upload a new image
exports.uploadImage = async (req, res) => {
  try {
    const { userId, imageId, imageUrl, diagnosis } = req.body;
    const uploadDate = new Date();
    const updated = await MedicalImaging.findOneAndUpdate(
      { "user.id": userId, "user.role": "MedicalProfessional" },
      {
        $push: {
          "medicalProfessional.uploadedImages": {
            imageId,
            imageUrl,
            diagnosis,
            uploadDate,
          },
        },
      },
      { new: true }
    );
    res.json(updated.medicalProfessional);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upload a new model
exports.uploadModel = async (req, res) => {
  try {
    const { userId, modelId, modelName, modelUrl, disease } = req.body;
    const uploadDate = new Date();
    const updated = await MedicalImaging.findOneAndUpdate(
      { "user.id": userId, "user.role": "MedicalProfessional" },
      {
        $push: {
          "medicalProfessional.uploadedModels": {
            modelId,
            modelName,
            modelUrl,
            disease,
            uploadDate,
          },
        },
      },
      { new: true }
    );
    res.json(updated.medicalProfessional);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upload a new dataset
exports.uploadDataset = async (req, res) => {
  try {
    const { userId, datasetId, datasetName, datasetUrl, disease } = req.body;
    const uploadDate = new Date();
    const updated = await MedicalImaging.findOneAndUpdate(
      { "user.id": userId, "user.role": "MedicalProfessional" },
      {
        $push: {
          "medicalProfessional.uploadedDatasets": {
            datasetId,
            datasetName,
            datasetUrl,
            disease,
            uploadDate,
          },
        },
      },
      { new: true }
    );
    res.json(updated.medicalProfessional);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all users (Admin Privilege)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await MedicalImaging.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update administrator permissions
exports.updateAdminPermissions = async (req, res) => {
  try {
    const adminId = req.params.id;
    const { manageUsers, manageData, manageModels } = req.body;
    const updatedAdmin = await MedicalImaging.findOneAndUpdate(
      { "user.id": adminId, "user.role": "Administrator" },
      {
        $set: {
          "administrator.manageUsers": manageUsers,
          "administrator.manageData": manageData,
          "administrator.manageModels": manageModels,
        },
      },
      { new: true }
    );
    if (!updatedAdmin)
      return res.status(404).json({ message: "Administrator not found" });
    res.json(updatedAdmin.administrator);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

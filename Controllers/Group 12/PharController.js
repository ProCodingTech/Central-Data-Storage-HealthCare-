const PharmacyService = require("../models/PharmacyService");

// Create a New Pharmacy
exports.createPharmacy = async (req, res) => {
  try {
    const { pharmacyId, name, location, contactInfo } = req.body;

    const newPharmacy = new PharmacyService({
      pharmacyId,
      name,
      location,
      contactInfo,
    });

    const savedPharmacy = await newPharmacy.save();
    res.status(201).json({ message: "Pharmacy created successfully", data: savedPharmacy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Pharmacies
exports.getAllPharmacies = async (req, res) => {
  try {
    const pharmacies = await PharmacyService.find();
    res.status(200).json(pharmacies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Pharmacy by ID
exports.getPharmacyById = async (req, res) => {
  try {
    const { pharmacyId } = req.params;

    const pharmacy = await PharmacyService.findOne({ pharmacyId });

    if (!pharmacy) {
      return res.status(404).json({ message: "Pharmacy not found" });
    }

    res.status(200).json(pharmacy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Pharmacy
exports.updatePharmacy = async (req, res) => {
  try {
    const { pharmacyId } = req.params;
    const updates = req.body;

    const updatedPharmacy = await PharmacyService.findOneAndUpdate(
      { pharmacyId },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedPharmacy) {
      return res.status(404).json({ message: "Pharmacy not found" });
    }

    res.status(200).json({ message: "Pharmacy updated successfully", data: updatedPharmacy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Pharmacy
exports.deletePharmacy = async (req, res) => {
  try {
    const { pharmacyId } = req.params;

    const deletedPharmacy = await PharmacyService.findOneAndDelete({ pharmacyId });

    if (!deletedPharmacy) {
      return res.status(404).json({ message: "Pharmacy not found" });
    }

    res.status(200).json({ message: "Pharmacy deleted successfully", data: deletedPharmacy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search Pharmacies by Name or Location
exports.searchPharmacies = async (req, res) => {
  try {
    const { query } = req.query;

    const pharmacies = await PharmacyService.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(pharmacies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
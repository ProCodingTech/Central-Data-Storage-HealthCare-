const Medicine = require("../models/Medicine");

// Create a New Medicine
exports.createMedicine = async (req, res) => {
  try {
    const {
      medicationId,
      name,
      description,
      manufacturer,
      purchasePrice,
      price,
      sideEffects,
    } = req.body;

    const newMedicine = new Medicine({
      medicationId,
      name,
      description,
      manufacturer,
      purchasePrice,
      price,
      sideEffects,
    });

    const savedMedicine = await newMedicine.save();
    res.status(201).json({ message: "Medicine created successfully", data: savedMedicine });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Medicines
exports.getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Medicine by Medication ID
exports.getMedicineById = async (req, res) => {
  try {
    const { medicationId } = req.params;

    const medicine = await Medicine.findOne({ medicationId });

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.status(200).json(medicine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Medicine
exports.updateMedicine = async (req, res) => {
  try {
    const { medicationId } = req.params;
    const updates = req.body;

    const updatedMedicine = await Medicine.findOneAndUpdate(
      { medicationId },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedMedicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.status(200).json({ message: "Medicine updated successfully", data: updatedMedicine });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Medicine
exports.deleteMedicine = async (req, res) => {
  try {
    const { medicationId } = req.params;

    const deletedMedicine = await Medicine.findOneAndDelete({ medicationId });

    if (!deletedMedicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.status(200).json({ message: "Medicine deleted successfully", data: deletedMedicine });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search Medicines by Name or Manufacturer
exports.searchMedicines = async (req, res) => {
  try {
    const { query } = req.query;

    const medicines = await Medicine.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { manufacturer: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Medicines with Price Range
exports.getMedicinesByPriceRange = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;

    const medicines = await Medicine.find({
      price: { $gte: Number(minPrice), $lte: Number(maxPrice) },
    });

    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
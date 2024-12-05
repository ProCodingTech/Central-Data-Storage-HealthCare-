const InventoryService = require("../models/InventoryService");

// Create or Add Inventory for a Pharmacy
exports.createInventory = async (req, res) => {
  try {
    const { pharmacyId, medications } = req.body;

    const newInventory = new InventoryService({
      pharmacyId,
      medications,
    });

    const savedInventory = await newInventory.save();
    res.status(201).json({ message: "Inventory created successfully", data: savedInventory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Inventory Records
exports.getAllInventories = async (req, res) => {
  try {
    const inventories = await InventoryService.find();
    res.status(200).json(inventories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Inventory by Pharmacy ID
exports.getInventoryByPharmacyId = async (req, res) => {
  try {
    const { pharmacyId } = req.params;

    const inventory = await InventoryService.findOne({ pharmacyId });

    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found for the specified pharmacy" });
    }

    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Inventory for a Pharmacy
exports.updateInventory = async (req, res) => {
  try {
    const { pharmacyId } = req.params;
    const updates = req.body;

    const updatedInventory = await InventoryService.findOneAndUpdate(
      { pharmacyId },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedInventory) {
      return res.status(404).json({ message: "Inventory not found for the specified pharmacy" });
    }

    res.status(200).json({ message: "Inventory updated successfully", data: updatedInventory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Inventory for a Pharmacy
exports.deleteInventory = async (req, res) => {
  try {
    const { pharmacyId } = req.params;

    const deletedInventory = await InventoryService.findOneAndDelete({ pharmacyId });

    if (!deletedInventory) {
      return res.status(404).json({ message: "Inventory not found for the specified pharmacy" });
    }

    res.status(200).json({ message: "Inventory deleted successfully", data: deletedInventory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Low Stock Medications
exports.getLowStockMedications = async (req, res) => {
  try {
    const { threshold } = req.query;

    const inventories = await InventoryService.find({
      "medications.quantity": { $lte: Number(threshold) },
    });

    const lowStockMedications = inventories.map((inventory) => ({
      pharmacyId: inventory.pharmacyId,
      medications: inventory.medications.filter((med) => med.quantity <= Number(threshold)),
    }));

    res.status(200).json(lowStockMedications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Expired Medications
exports.getExpiredMedications = async (req, res) => {
  try {
    const today = new Date();

    const inventories = await InventoryService.find({
      "medications.expirationDate": { $lt: today },
    });

    const expiredMedications = inventories.map((inventory) => ({
      pharmacyId: inventory.pharmacyId,
      medications: inventory.medications.filter((med) => new Date(med.expirationDate) < today),
    }));

    res.status(200).json(expiredMedications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
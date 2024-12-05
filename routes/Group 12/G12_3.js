const express = require("express");
const router = express.Router();
const inventoryController = require("../../Controllers/Group 12/InvController");

// Create or Add Inventory
router.post("/inventory", inventoryController.createInventory);

// Get All Inventory Records
router.get("/inventory", inventoryController.getAllInventories);

// Get Inventory by Pharmacy ID
router.get("/inventory/:pharmacyId", inventoryController.getInventoryByPharmacyId);

// Update Inventory by Pharmacy ID
router.put("/inventory/:pharmacyId", inventoryController.updateInventory);

// Delete Inventory by Pharmacy ID
router.delete("/inventory/:pharmacyId", inventoryController.deleteInventory);

// Get Low Stock Medications
router.get("/inventory-low-stock", inventoryController.getLowStockMedications);

// Get Expired Medications
router.get("/inventory-expired", inventoryController.getExpiredMedications);

module.exports = router;
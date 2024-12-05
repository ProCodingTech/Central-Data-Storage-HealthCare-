const express = require("express");
const router = express.Router();
const medicineController = require("../../Controllers/Group 12/MedController");

// Create a New Medicine
router.post("/medicine", medicineController.createMedicine);

// Get All Medicines
router.get("/medicine", medicineController.getAllMedicines);

// Get Medicine by ID
router.get("/medicine/:medicationId", medicineController.getMedicineById);

// Update Medicine
router.put("/medicine/:medicationId", medicineController.updateMedicine);

// Delete Medicine
router.delete("/medicine/:medicationId", medicineController.deleteMedicine);

// Search Medicines by Name or Manufacturer
router.get("/medicine-search", medicineController.searchMedicines);

// Get Medicines by Price Range
router.get("/medicine-price-range", medicineController.getMedicinesByPriceRange);

module.exports = router;
const express = require("express");
const router = express.Router();
const pharmacyController = require("../../Controllers/Group 12/PharController");

// Create a New Pharmacy
router.post("/pharmacy", pharmacyController.createPharmacy);

// Get All Pharmacies
router.get("/pharmacy", pharmacyController.getAllPharmacies);

// Get Pharmacy by ID
router.get("/pharmacy/:pharmacyId", pharmacyController.getPharmacyById);

// Update Pharmacy
router.put("/pharmacy/:pharmacyId", pharmacyController.updatePharmacy);

// Delete Pharmacy
router.delete("/pharmacy/:pharmacyId", pharmacyController.deletePharmacy);

// Search Pharmacies by Name or Location
router.get("/pharmacy-search", pharmacyController.searchPharmacies);

module.exports = router;
const express = require("express");
const router = express.Router();
const supplierController = require("../../Controllers/Group 12/SupController");

// Create a New Supplier
router.post("/suppliers", supplierController.createSupplier);

// Get All Suppliers
router.get("/suppliers", supplierController.getAllSuppliers);

// Get Supplier by ID
router.get("/suppliers/:supplierId", supplierController.getSupplierById);

// Update Supplier
router.put("/suppliers/:supplierId", supplierController.updateSupplier);

// Delete Supplier
router.delete("/suppliers/:supplierId", supplierController.deleteSupplier);

module.exports = router;
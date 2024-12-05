const Supplier = require("../models/Supplier.schema");

// Create a New Supplier
exports.createSupplier = async (req, res) => {
  try {
    const { supplierId, name, contactPerson, email, phone, address, status } = req.body;

    const newSupplier = new Supplier({
      supplierId,
      name,
      contactPerson,
      email,
      phone,
      address,
      status,
    });

    const savedSupplier = await newSupplier.save();
    res.status(201).json({ message: "Supplier created successfully", data: savedSupplier });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Suppliers
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Supplier by ID
exports.getSupplierById = async (req, res) => {
  try {
    const { supplierId } = req.params;

    const supplier = await Supplier.findOne({ supplierId });

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Supplier
exports.updateSupplier = async (req, res) => {
  try {
    const { supplierId } = req.params;
    const updates = req.body;

    const updatedSupplier = await Supplier.findOneAndUpdate(
      { supplierId },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedSupplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json({ message: "Supplier updated successfully", data: updatedSupplier });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Supplier
exports.deleteSupplier = async (req, res) => {
  try {
    const { supplierId } = req.params;

    const deletedSupplier = await Supplier.findOneAndDelete({ supplierId });

    if (!deletedSupplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    res.status(200).json({ message: "Supplier deleted successfully", data: deletedSupplier });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
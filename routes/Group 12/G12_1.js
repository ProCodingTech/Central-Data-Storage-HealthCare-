const express = require("express");
const router = express.Router();
const analyticsController = require("../../Controllers/Group 12/AnalyticController");

// Create a new analytics record
router.post("/analytics", analyticsController.createAnalytics);

// Get all analytics records
router.get("/analytics", analyticsController.getAllAnalytics);

// Get an analytics record by ID
router.get("/analytics/:id", analyticsController.getAnalyticsById);

// Update an analytics record
router.put("/analytics/:id", analyticsController.updateAnalytics);

// Delete an analytics record
router.delete("/analytics/:id", analyticsController.deleteAnalytics);

// Get analytics by pharmacy and date
router.get("/analytics-by-pharmacy", analyticsController.getAnalyticsByPharmacyAndDate);

module.exports = router;
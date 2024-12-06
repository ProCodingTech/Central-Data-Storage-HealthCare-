const express = require('express');
const router = express.Router();
const healthcareProviderController = require('./healthcareProviderController');

// Create a new Healthcare Provider
router.post('/healthcare-providers', healthcareProviderController.createHealthcareProvider);

// Get all Healthcare Providers
router.get('/healthcare-providers', healthcareProviderController.getAllHealthcareProviders);

// Get a Healthcare Provider by ID
router.get('/healthcare-providers/:id', healthcareProviderController.getHealthcareProviderById);

// Update a Healthcare Provider by ID
router.put('/healthcare-providers/:id', healthcareProviderController.updateHealthcareProviderById);

// Delete a Healthcare Provider by ID
router.delete('/healthcare-providers/:id', healthcareProviderController.deleteHealthcareProviderById);

// Create a new Patient Referral
router.post('/patient-referrals', healthcareProviderController.createPatientReferral);

// Get all Patient Referrals
router.get('/patient-referrals', healthcareProviderController.getAllPatientReferrals);

// Get a Patient Referral by ID
router.get('/patient-referrals/:id', healthcareProviderController.getPatientReferralById);

// Update a Patient Referral by ID
router.put('/patient-referrals/:id', healthcareProviderController.updatePatientReferralById);

// Delete a Patient Referral by ID
router.delete('/patient-referrals/:id', healthcareProviderController.deletePatientReferralById);

module.exports = router;
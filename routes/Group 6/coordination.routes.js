const express = require('express');
const router = express.Router();
const {
  createHealthcareProvider,
  getAllHealthcareProviders,
  getHealthcareProviderById,
  updateHealthcareProviderById,
  deleteHealthcareProviderById,
  createPatientReferral,
    getAllPatientReferrals,
    getPatientReferralById,
    updatePatientReferralById,
    deletePatientReferralById,
} = require('./controllers/controller'); // Adjust the path as necessary

// Healthcare Provider routes
router.post('/providers', createHealthcareProvider);
router.get('/providers', getAllHealthcareProviders);
router.get('/providers/:id', getHealthcareProviderById);
router.put('/providers/:id', updateHealthcareProviderById);
router.delete('/providers/:id', deleteHealthcareProviderById);
router.post('/referrals', createPatientReferral);
router.get('/referrals', getAllPatientReferrals);
router.get('/referrals/:id', getPatientReferralById);
router.put('/referrals/:id', updatePatientReferralById);
router.delete('/referrals/:id', deletePatientReferralById);

module.exports = router;
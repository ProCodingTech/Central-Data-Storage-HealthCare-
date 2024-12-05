const express = require('express');
const router = express.Router();

const {
    createMedicalBillingAndInsurance,
    getAllMedicalBillingAndInsurance,
    getMedicalBillingAndInsuranceById,
    updateMedicalBillingAndInsurance,
    deleteMedicalBillingAndInsurance,
    getFinancialReport,
    updatePaymentStatus
} = require('../../Controllers/Group 9/BillingController');

// Define routes
router.post('/createBill',createMedicalBillingAndInsurance);
router.get('/finReport/:id',getFinancialReport);
router.get('/getMedBill',getAllMedicalBillingAndInsurance);
router.get('/getBill/:id',getMedicalBillingAndInsuranceById);
router.put('/updateBill/:id',updateMedicalBillingAndInsurance);
router.put('/updatePayment/:id',updatePaymentStatus);
router.delete('/deleteBill/:id',deleteMedicalBillingAndInsurance);

module.exports = router;
const express = require('express');
const router = express.Router();
const {
    createDiagnosisResult,
    getAllDiagnosisResults,
    getDiagnosisResultById,
    updateDiagnosisResult,
    deleteDiagnosisResult
} = require('../../Controllers/Group 10/digResult');

// Create a new diagnosis result
router.post('/diagnosis-results', createDiagnosisResult);
router.get('/diagnosis-results', getAllDiagnosisResults);
router.get('/diagnosis-results/:id', getDiagnosisResultById);
router.put('/diagnosis-results/:id', updateDiagnosisResult);
router.delete('/diagnosis-results/:id', deleteDiagnosisResult);

module.exports = router;
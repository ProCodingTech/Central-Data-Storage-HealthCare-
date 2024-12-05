const express = require('express');
const router = express.Router();
const {
    createTrainingData,
    getAllTrainingData,
    getTrainingDataById,
    updateTrainingData,
    deleteTrainingData
} = require('../../Controllers/Group 10/trnDataCont');

// Create a new training data entry
router.post('/training-data', createTrainingData);
router.get('/training-data', getAllTrainingData);
router.get('/training-data/:id', getTrainingDataById);
router.put('/training-data/:id', updateTrainingData);
router.delete('/training-data/:id', deleteTrainingData);

module.exports = router;
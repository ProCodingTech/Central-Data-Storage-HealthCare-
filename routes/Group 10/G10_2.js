const express = require('express');
const router = express.Router();
const {
    createPreTrainedModel,
    getAllPreTrainedModels,
    getPreTrainedModelById,
    updatePreTrainedModel,
    deletePreTrainedModel
} = require('../../Controllers/Group 10/PreTrainedModel');

// Create a new pre-trained model
router.post('/newPreTrndModel', createPreTrainedModel);
router.get('/getAllPreTrndModels', getAllPreTrainedModels);
router.get('/getPreTrndModelById/:id', getPreTrainedModelById);
router.put('/updatePreTrndModel/:id', updatePreTrainedModel);
router.delete('/delPreTrndModel/:id', deletePreTrainedModel);

module.exports = router;
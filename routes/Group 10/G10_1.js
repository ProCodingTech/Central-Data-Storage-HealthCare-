const express = require('express');
const router = express.Router();
const {
    createModel,
    getAllModels,
    getModelById,
    updateModel,
    deleteModel
} = require('../../Controllers/Group 10/AIModel');


router.post('/createAiModel', createModel);
router.get('/getAllAiModels', getAllModels);
router.get('/getAiModelById/:id', getModelById);
router.put('/updateAiModel/:id', updateModel);
router.delete('/deleteAiModel/:id', deleteModel);

module.exports = router;
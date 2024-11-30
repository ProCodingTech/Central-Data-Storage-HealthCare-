const express = require('express');
const router = express.Router();
// const controllers = require('../../Controllers/Group 7/LabController');
const {
    getAllLabData,
    getLabDataById,
    createLabData,
    updateLabData,
    deleteLabData
} = require('../../Controllers/Group 7/LabController')

// Define routes
router.get('/',getAllLabData);
router.get('/:id',getLabDataById);
router.post('/',createLabData);
router.put('/:id',updateLabData);
router.delete('/:id',deleteLabData);

module.exports = router;
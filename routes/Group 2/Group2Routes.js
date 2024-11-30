const express = require ("express");
const { createNurse, getAllNurses } = require('../../Controllers/Group 2/NurseController')

const router = express.Router();

router.get ('/getAllNurses', getAllNurses);
router.post ('/createNurse', createNurse);

module.exports = router;
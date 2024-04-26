const express = require('express');
const { getUnits, createUnit, deleteUnit } = require('../controllers/unitController');

const router = express.Router();

//Get all units
router.get('/getAll', getUnits);

//Get unit by id
router.get('/get/:id');

//Create new unit
router.post('/create', createUnit);

//Delte existing unit
router.delete('/delete/:id', deleteUnit);

module.exports = router;

const express = require('express');
const { getTypes, createType, deleteType } = require('../controllers/typeController');

const router = express.Router();

//Get all types
router.get('/getAll', getTypes);

//Get type by id
router.get('/get/:id');

//Create new type
router.post('/create', createType);

//Delte existing type
router.delete('/delete/:id', deleteType);

module.exports = router;

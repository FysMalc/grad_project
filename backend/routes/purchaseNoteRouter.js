const express = require('express');

const { getPurchaseNotes, getPurchaseNote, createPurchaseNote } = require('../controllers/purchaseNoteController');

const router = express.Router();

//Get all dispatch notes

router.get('/getAll', getPurchaseNotes);

//Get a single Purchase note

router.get('/get/:id', getPurchaseNote);

//Create a new Purchase note
router.post('/create', createPurchaseNote);

//Update a dispatch note

//Delete a dispatch note
module.exports = router;

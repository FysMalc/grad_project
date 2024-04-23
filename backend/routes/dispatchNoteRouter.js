const express = require('express');

const { getDispatchNotes, getDispatchNote, createDispatchNote } = require('../controllers/dispatchNoteController');

const router = express.Router();

//Get all dispatch notes

router.get('/getAll', getDispatchNotes);

//Get a single dispatch note

router.get('/get/:id', getDispatchNote);

//Create a new dispatch note
router.post('/create', createDispatchNote);

//Update a dispatch note

//Delete a dispatch note
module.exports = router;

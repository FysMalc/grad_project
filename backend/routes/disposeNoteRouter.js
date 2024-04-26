const express = require('express');

const { getDisposeNotes, getDisposeNote, createDisposeNote } = require('../controllers/disposeNoteController');

const router = express.Router();

//Get all dispose notes

router.get('/getAll', getDisposeNotes);

//Get a single dispose note

router.get('/get/:id', getDisposeNote);

//Create a new Dispose note
router.post('/create', createDisposeNote);

//Update a dispatch note

//Delete a dispatch note
module.exports = router;

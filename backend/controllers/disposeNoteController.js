const disposeNote = require('../models/disposeNoteModel');
const mongoose = require('mongoose');
const moment = require('moment');

//Get all Note
const getDisposeNotes = async (req, res) => {
	const disposeNotes = await disposeNote.find({}).sort({ createdAt: -1 });

	res.status(200).json(disposeNotes);
};

const getDisposeNote = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ msg: 'Id không hợp lệ' });
	}
	const disposeNote = await disposeNote.findById(req.params.id);

	if (!disposeNote) return res.status(404).json({ msg: 'Phiếu huỷ không tồn tại' });

	res.status(200).json(disposeNote);
};

const createDisposeNote = async (req, res) => {
	const { nguoi_lap, dispose_list, note } = req.body;
	const createdAt = moment().format('HH:mm:ss DD-MM-YYYY');
	try {
		const disposeNote = await disposeNote.create({ nguoi_lap, dispose_list, note, createdAt });
		res.status(200).json(disposeNote);
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
};

module.exports = {
	getDisposeNotes,
	getDisposeNote,
	createDisposeNote,
};

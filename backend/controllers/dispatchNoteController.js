const DispatchNote = require('../models/dispatchNoteModel');
const mongoose = require('mongoose');
const moment = require('moment');

//Get all Note
const getDispatchNotes = async (req, res) => {
	const dispatchNotes = await DispatchNote.find({}).populate('ingredient').sort({ createdAt: -1 });

	res.status(200).json(dispatchNotes);
};

const getDispatchNote = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ msg: 'Id không hợp lệ' });
	}
	const dispatchNote = await DispatchNote.findById(req.params.id).populate('ingredient');

	if (!dispatchNote) return res.status(404).json({ msg: 'Phiếu xuất không tồn tại' });

	res.status(200).json(dispatchNote);
};

const createDispatchNote = async (req, res) => {
	const { nguoi_lap, nguoi_nhan, dispatch_list } = req.body;
	const createdAt = moment().format('HH:mm:ss DD-MM-YYYY');
	try {
		const dispatchNote = await DispatchNote.create({ nguoi_lap, nguoi_nhan, dispatch_list, createdAt });
		res.status(200).json(dispatchNote);
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
};

module.exports = {
	getDispatchNotes,
	getDispatchNote,
	createDispatchNote,
};

const purchaseNote = require('../models/purchaseNoteModel');
const mongoose = require('mongoose');
const moment = require('moment');

//Get all Note
const getPurchaseNotes = async (req, res) => {
	const purchaseNotes = await purchaseNote.find({}).sort({ createdAt: -1 });

	res.status(200).json(purchaseNotes);
};

const getPurchaseNote = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ msg: 'Id không hợp lệ' });
	}
	const purchaseNote = await purchaseNote.findById(req.params.id);

	if (!purchaseNote) return res.status(404).json({ msg: 'Phiếu xuất không tồn tại' });

	res.status(200).json(purchaseNote);
};

const createPurchaseNote = async (req, res) => {
	const { nguoi_lap, nguoi_nhan, purchase_list } = req.body;
	const createdAt = moment().format('HH:mm:ss DD-MM-YYYY');
	try {
		const purchaseNote = await purchaseNote.create({ nguoi_lap, nguoi_nhan, purchase_list, createdAt });
		res.status(200).json(purchaseNote);
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
};

module.exports = {
	getPurchaseNotes,
	getPurchaseNote,
	createPurchaseNote,
};

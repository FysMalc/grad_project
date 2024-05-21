const DispatchNote = require('../models/dispatchNoteModel');

const mongoose = require('mongoose');

//Get all Note
const getDispatchNotes = async (req, res) => {
	const dispatchNotes = await DispatchNote.find({}).sort({ createdAt: -1 });

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
	const { creator, receiver, dispatch_list, note } = req.body;
	const createdAt = new Date();
	try {
		const mappedDispatchList = dispatch_list.map((item) => ({
			ingredientName: item.ingredient.name, // Assuming you have a 'name' property in the ingredient document
			amount: item.amount,
			unitName: item.unit.name, // Assuming you have a 'name' property in the unit document
		}));

		const dispatchNote = await DispatchNote.create({
			creator,
			receiver,
			dispatch_list: mappedDispatchList,
			note,
			createdAt,
		});

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

const DisposeNote = require('../models/disposeNoteModel');
const mongoose = require('mongoose');
const Ingredient = require('../models/ingredientModel');
//Get all Note
const getDisposeNotes = async (req, res) => {
	const disposeNotes = await DisposeNote.find({})
		.populate('dispose_list.ingredient')
		.populate('dispose_list.unit')
		.sort({ createdAt: -1 });

	res.status(200).json(disposeNotes);
};

const getDisposeNote = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ msg: 'Id không hợp lệ' });
	}
	const disposeNote = await DisposeNote.findById(req.params.id);

	if (!disposeNote) return res.status(404).json({ msg: 'Phiếu huỷ không tồn tại' });

	res.status(200).json(disposeNote);
};

const createDisposeNote = async (req, res) => {
	const { creator, dispose_list, note } = req.body;
	const createdAt = new Date();
	try {
		const disposeNote = await DisposeNote.create({ creator, dispose_list, note, createdAt });

		for (const item of dispose_list) {
			const ingredient = await Ingredient.findById(item.ingredient._id);
			if (ingredient) {
				ingredient.amount -= item.amount;
				await ingredient.save();
			}
		}
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

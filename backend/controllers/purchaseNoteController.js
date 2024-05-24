const PurchaseNote = require('../models/purchaseNoteModel');
const Ingredient = require('../models/ingredientModel');
const mongoose = require('mongoose');

//Get all Note
const getPurchaseNotes = async (req, res) => {
	const purchaseNotes = await PurchaseNote.find({})
		.populate('purchase_list.ingredient')
		.populate('purchase_list.unit')
		.sort({ createdAt: -1 });

	res.status(200).json(purchaseNotes);
};

const getPurchaseNote = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ msg: 'Id không hợp lệ' });
	}
	const purchaseNote = await PurchaseNote.findById(req.params.id);

	if (!purchaseNote) return res.status(404).json({ msg: 'Phiếu nhập không tồn tại' });

	res.status(200).json(purchaseNote);
};

const createPurchaseNote = async (req, res) => {
	const { creator, receiver, purchase_list, note } = req.body;
	const createdAt = new Date();
	try {
		const purchaseNote = await PurchaseNote.create({ creator, receiver, purchase_list, note, createdAt });

		for (const item of purchase_list) {
			const ingredient = await Ingredient.findById(item.ingredient._id);
			if (ingredient) {
				ingredient.amount += item.amount;
				await ingredient.save();
			}
		}
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

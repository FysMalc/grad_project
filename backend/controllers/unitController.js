const Unit = require('../models/unitModel');
const Ingredient = require('../models/ingredientModel');
const mongoose = require('mongoose');

// GET all Ingredient
const getUnits = async (req, res) => {
	const units = await Unit.find({}).sort({ createdAt: -1 });
	res.status(200).json(units);
};

const getUnit = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ msg: 'ID không hợp lệ' });
	}

	const unit = await Unit.findOne({
		_id: id,
	});

	if (!unit) return res.status(404).json({ msg: 'Đơn vị không tồn tại' });

	return res.status(200).json(unit);
};

const createUnit = async (req, res) => {
	const { name } = req.body;
	const nameRegex = new RegExp(`^${name}$`, 'i');
	const unit = await Unit.findOne({ name: nameRegex });
	if (unit) {
		return res.status(500).json({ error: 'Đơn vị đã tồn tại' });
	}
	// add doc to db
	try {
		const unit = await Unit.create({ name });
		res.status(200).json(unit);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const deleteUnit = async (req, res) => {
	const { id } = req.params;
	console.log(id);
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ msg: 'ID không hợp lệ' });
	}
	try {
		const ingredientUsingUnit = await Ingredient.findOne({ unit: id });
		if (ingredientUsingUnit !== null) {
			return res.status(400).json({ error: 'Đơn vị đang được sử dụng' });
		}
	} catch (error) {
		return res.status(400).json({ msg: error.message });
	}
	const unit = await Unit.findByIdAndDelete(id);

	if (!unit) return res.status(404).json({ msg: 'Đơn vị không tồn tại' });
	return res.status(200).json(unit);
};

module.exports = {
	getUnits,
	getUnit,
	createUnit,
	deleteUnit,
};

const Type = require('../models/typeModel');
const Ingredient = require('../models/ingredientModel');
const mongoose = require('mongoose');

// GET all type
const getTypes = async (req, res) => {
	const types = await Type.find({}).sort({ createdAt: -1 });
	res.status(200).json(types);
};

// GET on type
const getType = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ msg: 'ID không hợp lệ' });
	}

	const type = await Type.findOne({
		_id: id,
	});

	if (!type) return res.status(404).json({ msg: 'Loại nguyên liệu không tồn tại' });

	return res.status(200).json(type);
};

// CREATE type
const createType = async (req, res) => {
	const { name } = req.body;

	// add doc to db
	try {
		const type = await Type.create({ name });
		res.status(200).json(type);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

//DELETE type
const deleteType = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ msg: 'ID không hợp lệ' });
	}

	const ingredientUsingType = await Ingredient.findOne({ type: id });
	if (ingredientUsingType) {
		return res.status(400).json({ msg: 'Loại nguyên liệu đang được sử dụng' });
	}

	const type = await Type.findOneAndDelete(id);

	if (type) return res.status(404).json({ msg: 'Loại nguyên liệu không tồn tại' });
	res.status(200).json(type);
};

module.exports = {
	getTypes,
	getType,
	createType,
	deleteType,
};

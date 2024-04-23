const Ingredient = require('../models/ingredientModel');
const mongoose = require('mongoose');

// GET all Ingredient
const getIngredients = async (req, res) => {
	const ingredients = await Ingredient.find({}).populate('unit').sort({ createdAt: -1 });

	res.status(200).json(ingredients);
};

// GET a single Ingredient
const getIngredient = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: 'ID không hợp lệ' });
	}

	const ingredient = await Ingredient.findOne({
		_id: id,
	});

	if (!ingredient) {
		return res.status(404).json({
			error: 'Nguyên liệu không tồn tại',
		});
	}

	res.status(200).json(ingredient);
};

// Create a new Ingredient
const createIngredient = async (req, res) => {
	const { name, type, amount, unit } = req.body;
	const ingredient = await Ingredient.findOne({
		name: name,
	});

	if (ingredient) {
		return res.status(500).json({ error: 'Nguyên liệu đã tồn tại.' });
	}

	try {
		const ingredient = await Ingredient.create({ name, type, amount, unit });
		res.status(200).json(ingredient);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// DELETE a Ingredient
const deleteIngredient = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ msg: 'ID không hợp lệ' });
	}

	const ingredient = await Ingredient.findOneAndDelete(id);

	if (!ingredient) {
		return res.status(404).json({ msg: 'Nguyên liệu không tồn tại' });
	}

	res.status(200).json(ingredient);
};

//  UPDATE an existing Ingredient
const updateIngredient = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ msg: 'ID không hợp lệ' });
	}

	const ingredient = await Ingredient.findOneAndUpdate(
		{
			_id: id,
		},
		{ ...req.body }
	);
	res.send(ingredient);
	if (!ingredient) {
		return res.status(404).json({ msg: 'Nguyên liệu không tồn tại' });
	}

	res.status(200).json(Ingredient);
};

module.exports = {
	getIngredients,
	getIngredient,
	createIngredient,
	deleteIngredient,
	updateIngredient,
};

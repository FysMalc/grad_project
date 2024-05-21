const Ingredient = require('../models/ingredientModel');
const Meal = require('../models/mealModel');
const mongoose = require('mongoose');
const moment = require('moment');

// GET all Ingredient
const getIngredients = async (req, res) => {
	const ingredients = await Ingredient.find({}).populate('unit').populate('type').sort({ name: -1 });

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
	const createdAt = moment().format('HH:mm:ss DD-MM-YYYY ');

	const nameRegex = new RegExp(`^${name}$`, 'i');
	const ingredient = await Ingredient.findOne({
		name: nameRegex,
	});

	if (ingredient) {
		return res.status(500).json({ error: 'Nguyên liệu đã tồn tại.' });
	}

	try {
		const ingredient = await Ingredient.create({ name, type, amount, unit, createdAt });
		res.status(200).json(ingredient);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// DELETE a Ingredient
const deleteIngredient = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: 'ID không hợp lệ' });
	}
	const meals = await Meal.find({ 'ingredients.ingredient': id }).populate('ingredients.ingredient');

	if (meals.length !== 0) {
		return res.status(400).json({ error: 'Nguyên liệu đang được sử dụng' });
	}
	const ingredient = await Ingredient.findByIdAndDelete(id);

	if (!ingredient) {
		return res.status(404).json({ error: 'Nguyên liệu không tồn tại' });
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

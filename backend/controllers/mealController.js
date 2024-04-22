const Meal = require('../models/mealModel');
const mongoose = require('mongoose');

const getAllMeals = async (req, res) => {
	const meals = await Meal.find().sort({ createdAt: -1 });

	res.status(200).json(meals);
};

const getMeal = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: 'ID không hợp lệ' });
	}

	const meal = await Meal.findOne({
		_id: id,
	});

	if (!meal) {
		return res.status(404).json({
			error: 'Không tìm thấy món ăn này',
		});
	}
};

const createMeal = async (req, res) => {
	const { name, ingredients, price, unit } = req.body;

	const meal = await Meal.findOne({
		name: name,
	});

	if (meal) {
		return res.status(500).json({
			error: 'Món ăn đã tồn tại',
		});
	}
	try {
		const meal = await Meal.create({ name, ingredients, price, unit });
		res.status(200).json(meal);
	} catch (e) {
		res.status(400).json({
			error: e.message,
		});
	}
};

const deleteMeal = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send('ID không hợp lệ!');
	}

	const meal = await Meal.findOneAndDelete(id);
	if (!meal) {
		return res.status(404).send('Không tìm thấy món ăn này!');
	}

	res.status(200).json(meal);
};

const updateMeal = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send('ID không hợp lệ!');
	}

	const meal = await Meal.findByOneAndUpdate(id);
	if (!meal) {
		return res.status(404).send('Không tìm thấy món ăn này!');
	}

	res.status(200).json(meal);
};

module.exports = {
	createMeal,
	getMeal,
	deleteMeal,
	updateMeal,
	getAllMeals,
};

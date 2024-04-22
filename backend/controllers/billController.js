const Bill = require('../models/billModel');
const Meal = require('../models/mealModel');
const Ingredient = require('../models/ingredientModel');

//Get all bills
const getAllBills = async (req, res) => {
	const bill = await Bill.find().sort({ createdAt: -1 });

	res.status(200).json(bill);
};

const getBill = async (req, res) => {
	const bill = await Bill.find();
};

const createBill = async (req, res) => {
	try {
		const { table, orders } = req.body;
		const bill = new Bill({
			table: table,
			orders: orders,
		});

		let totalAmount = 0;
		for (const order of bill.orders) {
			const meal = await Meal.findById(order.mealID);
			totalAmount += meal.price * order.quantity;

			for (const ingredient of meal.ingredients) {
				const ingredientDoc = await Ingredient.findById(ingredient.ingredientId);
				ingredientDoc.amount -= order.quantity * ingredient.amount;

				await ingredientDoc.save();
			}
		}
		bill.total = totalAmount;

		await bill.save();
		res.status(201).json(bill);
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

module.exports = {
	getAllBills,
	createBill,
};

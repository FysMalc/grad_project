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

	res.status(200).json(bill);
};

const createBill = async (req, res) => {
	try {
		const { table, orders, ordersCost, serviceFee, voucher, total } = req.body;
		// const date = new Date();
		// const now = new Date(date.getTime() + 7 * 60 * 60 * 1000);
		const now = new Date();
		const bill = new Bill({
			table,
			orders: orders.map((order) => ({
				mealName: order.mealName,
				quantity: order.quantity,
			})),
			ordersCost,
			serviceFee,
			voucher,
			total,
			createdAt: now,
		});

		for (const order of orders) {
			const meal = await Meal.findById(order.mealID);

			for (const ingredient of meal.ingredients) {
				const ingredientDoc = await Ingredient.findById(ingredient.ingredient);
				ingredientDoc.amount -= order.quantity * ingredient.amount;
				ingredientDoc.amount = parseFloat(ingredientDoc.amount.toFixed(1));
				await ingredientDoc.save();
			}
		}

		await bill.save();

		res.status(201).json(bill);
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

module.exports = {
	getAllBills,
	getBill,
	createBill,
};

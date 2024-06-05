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
		const { table, orders, ordersCost, serviceFee, voucher, total, staffName } = req.body;
		// const date = new Date();
		// const now = new Date(date.getTime() + 7 * 60 * 60 * 1000);
		const now = new Date();
		const bill = new Bill({
			table,
			orders: orders.map((order) => ({
				mealName: order.mealName,
				quantity: order.quantity,
				price: order.price,
			})),
			ordersCost,
			serviceFee,
			voucher,
			total,
			staffName,
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

const getRevenue = async (req, res) => {
	const currentYear = new Date().getFullYear();
	const offsetInHours = 7; // Your timezone offset in hours

	const bills = await Bill.aggregate([
		{
			$match: {
				createdAt: {
					$gte: new Date(
						`${currentYear}-01-01T00:00:00.000+00:00` // Start of the year in UTC
					),
					$lte: new Date(
						`${currentYear}-12-31T23:59:59.999+00:00` // End of the year in UTC
					),
				},
			},
		},
		{
			$addFields: {
				createdAtLocal: {
					$add: [
						'$createdAt',
						{ $multiply: [offsetInHours * 60 * 60 * 1000, 1] }, // Offset in milliseconds
					],
				},
			},
		},
		{
			$group: {
				_id: { $month: '$createdAtLocal' },
				totalRevenue: { $sum: '$total' },
			},
		},
		{
			$sort: { _id: 1 },
		},
	]);

	return res.status(201).json(bills);
};

const getConsumedIngredient = async (req, res) => {
	const bills = await Bill.aggregate([
		{
			$lookup: {
				from: 'meals',
				localField: 'orders.mealName',
				foreignField: 'name',
				as: 'mealDetails',
			},
		},
		{
			$unwind: '$mealDetails',
		},
		{
			$unwind: '$orders',
		},
		{
			$project: {
				'mealDetails.ingredients': 1,
				'orders.quantity': 1,
			},
		},
		{
			$unwind: '$mealDetails.ingredients',
		},
		{
			$lookup: {
				from: 'ingredients',
				localField: 'mealDetails.ingredients.ingredient',
				foreignField: '_id',
				as: 'ingredientDetails',
			},
		},
		{
			$unwind: '$ingredientDetails',
		},
		{
			$group: {
				_id: '$ingredientDetails.name',
				totalQuantity: { $sum: { $multiply: ['$orders.quantity', '$mealDetails.ingredients.amount'] } },
			},
		},
		{
			$sort: { totalQuantity: -1 },
		},
		{
			$limit: 10,
		},
	]);
	return res.status(201).json(bills);
};

module.exports = {
	getAllBills,
	getBill,
	createBill,
	getRevenue,
	getConsumedIngredient,
};

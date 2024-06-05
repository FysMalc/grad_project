const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	ingredients: [
		{
			ingredient: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'ingredient',
				required: true,
			},
			amount: { type: Number, required: true },
			unit: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'unit',
				required: true,
			},
		},
	],
	firstPrice: { type: Number, required: true },
	price: { type: Number, required: true },
	createdAt: { type: String, required: true },
});

module.exports = mongoose.model('meal', mealSchema);

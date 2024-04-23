const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const mealSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	ingredients: [
		{
			name: { type: String, required: true },
			amount: { type: Number, required: true },
			unit: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'unit',
				required: true,
			},
			ingredientId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'ingredient',
				required: true,
			},
		},
	],
	price: {
		type: Number,
		required: true,
	},
	createdAt: {
		type: String,
		default: moment().format('HH:mm:ss DD-MM-YYYY'),
		required: true,
	},
});

module.exports = mongoose.model('meal', mealSchema);

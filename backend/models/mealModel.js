const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		ingredients: [
			{
				name: { type: String, required: true },
				amount: { type: Number, required: true },
				unit: { type: String, required: true },
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
	},
	{ timestamps: true }
);

module.exports = mongoose.model('meal', mealSchema);

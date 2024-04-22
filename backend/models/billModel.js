const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema(
	{
		table: {
			type: String,
			required: true,
		},
		orders: [
			{
				mealID: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'meal', // Reference to the Order model
				},
				quantity: { type: Number, required: true },
			},
		],
		total: {
			type: Number,
			required: true,
		},

		createdAt: {
			type: Date,
			default: Date.now,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('bill', billSchema);

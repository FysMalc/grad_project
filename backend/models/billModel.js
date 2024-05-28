const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const billSchema = new Schema({
	table: {
		type: String,
		required: true,
	},
	orders: [
		{
			mealName: { type: String, required: true },
			quantity: { type: Number, required: true },
		},
	],
	ordersCost: { type: Number, require: true },
	serviceFee: { type: Number },
	voucher: { type: Number },
	total: {
		type: Number,
		required: true,
	},
	staffName: { type: String },
	createdAt: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model('bill', billSchema);

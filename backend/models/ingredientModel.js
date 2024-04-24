const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	type: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	unit: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'unit',
		required: true,
	},
	createdAt: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('ingredient', ingredientSchema);

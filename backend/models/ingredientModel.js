const mongoose = require('mongoose');
const moment = require('moment');

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
		name: {
			type: String,
			required: true,
		},
		ref: 'unit',
		required: true,
	},
	createdAt: {
		type: String,
		default: moment().format('HH:mm:ss DD-MM-YYYY'),
		required: true,
	},
});

module.exports = mongoose.model('ingredient', ingredientSchema);

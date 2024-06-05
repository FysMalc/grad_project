const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const disposeSchema = new Schema({
	creator: {
		type: String,
		required: true,
	},
	dispose_list: [
		{
			ingredientName: { type: String, required: true },
			amount: { type: Number, required: true },
			unit: { type: String, required: true },
		},
	],
	note: {
		type: String,
	},
	createdAt: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model('disposeNote', disposeSchema);

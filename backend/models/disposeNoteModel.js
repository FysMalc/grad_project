const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const disposeSchema = new Schema({
	creator: {
		type: String,
		required: true,
	},
	dispose_list: [
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
	note: {
		type: String,
	},
	createdAt: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model('disposeNote', disposeSchema);

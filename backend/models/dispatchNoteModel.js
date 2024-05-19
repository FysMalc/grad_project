const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dispatchNoteSchema = new Schema({
	creator: {
		type: String,
		required: true,
	},
	receiver: {
		type: String,
		required: true,
	},
	dispatch_list: [
		{
			ingredientName: { type: String, required: true },
			amount: { type: Number, required: true },
			unitName: { type: String, required: true },
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

module.exports = mongoose.model('dispatchNote', dispatchNoteSchema);

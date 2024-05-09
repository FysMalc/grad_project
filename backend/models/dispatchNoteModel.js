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
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('dispatchNote', dispatchNoteSchema);

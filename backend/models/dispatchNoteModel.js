const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dispatchNoteSchema = new Schema({
	nguoi_lap: {
		type: String,
		required: true,
	},
	nguoi_nhan: {
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
			unit: { type: String, required: true },
		},
	],
	createdAt: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('dispatchNote', dispatchNoteSchema);

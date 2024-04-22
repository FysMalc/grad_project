const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dispatchNoteSchema = new Schema(
	{
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
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('dispatchNote', dispatchNoteSchema);

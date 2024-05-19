const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseNoteSchema = new Schema({
	creator: {
		type: String,
		required: true,
	},
	receiver: {
		type: String,
		required: true,
	},
	purchase_list: [
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

module.exports = mongoose.model('purchaseNote', purchaseNoteSchema);

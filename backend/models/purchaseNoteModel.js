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
			ingredientName: {
				type: String,

				required: true,
			},
			amount: { type: Number, required: true },
			unit: {
				type: String,

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

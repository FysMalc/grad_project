const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const disposeSchema = new Schema({
	nguoi_lap: {
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
			unit: { type: String, required: true },
		},
	],
	createdAt: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('disposeNote', disposeSchema);

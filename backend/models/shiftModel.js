const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shiftSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
	},
});

module.exports = mongoose.model('shift', shiftSchema);

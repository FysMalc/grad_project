const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
	},
});

module.exports = mongoose.model('staff', staffSchema);

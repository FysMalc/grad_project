const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const unitSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
});

module.exports = mongoose.model('unit', unitSchema);

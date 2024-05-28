const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require('moment');

const { generateAccessToken, generateRefreshToken } = require('../services/jwtServices');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	staffName: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,

		required: true,
	},
	createdAt: {
		type: String,
		required: true,
	},
});

// static signup method

userSchema.statics.signup = async function (username, password, staffName, isAdmin) {
	//validation
	if (!username || !password || !staffName) {
		throw Error('Tất cả ô không được trống');
	}

	const exists = await this.findOne({ username });

	if (exists) {
		throw Error('username already in use');
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	const createdAt = moment().format('HH:mm:ss DD-MM-YYYY');
	const user = await this.create({
		username,
		password: hashedPassword,
		staffName,
		isAdmin,
		createdAt: createdAt,
	});

	const access_token = await generateAccessToken({
		id: user._id,
		isAdmin: user.isAdmin,
	});

	const refresh_token = await generateRefreshToken({
		id: user._id,
		isAdmin: user.isAdmin,
	});

	return {
		user,
		access_token,
		refresh_token,
	};
};

userSchema.statics.login = async function (username, password) {
	if (!username) {
		throw Error('username không được trống');
	}
	if (!password) {
		throw Error('password không được trống');
	}

	const user = await this.findOne({ username });

	if (!user) {
		throw Error('username không tồn tại');
	}

	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		throw Error('Mật khẩu sai');
	}

	const access_token = await generateAccessToken({
		id: user._id,
		isAdmin: user.isAdmin,
	});

	const refresh_token = await generateRefreshToken({
		id: user._id,
		isAdmin: user.isAdmin,
	});

	return {
		user,
		access_token,
		refresh_token,
	};
};

userSchema.statics.update = async function (id, data) {
	const user = await this.findOne({ _id: id });

	if (!user) {
		throw Error('User không tồn tại');
	}
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(data.password, salt);
	data.password = hashedPassword;
	const updateUser = await this.findByIdAndUpdate(id, data);

	return updateUser;
};

userSchema.statics.delete = async function (id) {
	const user = await this.findOne({ _id: id });

	if (!user) {
		throw Error('User không tồn tại');
	}

	const deleteUser = await this.findByIdAndDelete(id);
	return deleteUser;
};

module.exports = mongoose.model('User', userSchema);

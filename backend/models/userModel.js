const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { generateAccessToken, generateRefreshToken } = require('../services/jwtServices');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		default: false,
		required: true,
	},
});

// static signup method

userSchema.statics.signup = async function (email, password) {
	//validation
	if (!email || !password) {
		throw Error('Tất cả ô không được trống');
	}

	if (!validator.isEmail(email)) {
		throw Error('Email không hợp lệ');
	}

	if (!validator.isStrongPassword(password)) {
	}

	const exists = await this.findOne({ email });

	if (exists) {
		throw Error('Email already in use');
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await this.create({
		email,
		password: hashedPassword,
	});

	const access_token = await generateAccessToken({
		id: user.id,
		isAdmin: user.isAdmin,
	});

	const refresh_token = await generateRefreshToken({
		id: user.id,
		isAdmin: user.isAdmin,
	});

	return {
		user,
		access_token,
		refresh_token,
	};
};

userSchema.statics.login = async function (email, password) {
	if (!email || !password) {
		throw Error('Tất cả ô không được trống');
	}

	const user = await this.findOne({ email });

	if (!user) {
		throw Error('Email không tồn tại');
	}

	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		throw Error('Mật khẩu sai');
	}

	const access_token = await generateAccessToken({
		id: user.id,
		isAdmin: user.isAdmin,
	});

	const refresh_token = await generateRefreshToken({
		id: user.id,
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

	const updateUser = await this.findByIdAndUpdate(id, data, { new: true });

	return updateUser;
};

userSchema.statics.delete = async function (id) {
	const user = await this.findOne({ _id: id });

	if (!user) {
		throw Error('User không tồn tại');
	}

	const deleteUser = await this.findByIdAndDelete(id);
};

module.exports = mongoose.model('User', userSchema);

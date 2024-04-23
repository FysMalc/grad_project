const User = require('../models/userModel');
const dotenv = require('dotenv');

dotenv.config();

//login
const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const response = await User.login(email, password);
		const { user, access_token, refresh_token } = response;

		res.cookie('refresh_token', refresh_token, {
			httpOnly: true,
			secure: false,
			sameSite: 'strict',
			path: '/',
		});

		res.status(200).json({ email, refresh_token });
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

//signup
const signupUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const response = await User.signup(email, password);
		const { user, access_token, refresh_token } = response;

		res.cookie('refresh_token', refresh_token, {
			httpOnly: true,
			secure: false,
			sameSite: 'strict',
			path: '/',
		});

		res.status(200).json({ email, refresh_token });
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

const logoutUser = (req, res) => {
	try {
		res.clearCookie('refresh_token');
		return res.status(200).json({
			status: 'OK',
			message: "You've been logged out.",
		});
	} catch (e) {
		return res.status(404).json({
			message: e.message,
		});
	}
};

const updateUser = async (req, res) => {
	try {
		const userID = req.params.id;
		const data = req.body;
		if (!userID) {
			return res.status(400).json({
				status: 'ERR',
				message: 'The userID is required',
			});
		}

		const response = await User.update(userID, data);

		return res.status(200).json(response);
	} catch (e) {
		return res.status(404).json({
			message: e.message,
		});
	}
};

const deleteUser = async (req, res) => {
	try {
		const userID = req.params.id;

		if (!userID) {
			return res.status(404).json({
				status: 'ERR',
				message: 'The userId is required',
			});
		}

		const response = await User.delete(userID);

		return res.status(200).json(response);
	} catch (e) {
		return res.stattus(400).json({
			message: e.message,
		});
	}
};

const getAllUser = async (req, res) => {
	try {
		const allUser = await User.find().sort({
			createdAt: -1,
		});

		return res.status(200).json(allUser);
	} catch (e) {
		return res.status(400).json({
			message: e.message,
		});
	}
};

module.exports = {
	loginUser,
	signupUser,
	logoutUser,
	updateUser,
	deleteUser,
	getAllUser,
};
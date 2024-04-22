const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { refreshTokenJwtService } = require('../services/jwtServices');

dotenv.config();

const verifyToken = (token) =>
	new Promise((resolve, reject) => {
		jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
			if (err) return reject(err);
			resolve({ user });
		});
	});

const handleErrors = (err, res) => {
	if (err.name === 'JsonWebTokenError') {
		return res.status(401).json({
			message: err.message,
			status: 'ERROR',
		});
	}

	return res.status(400).json({
		message: err.message,
		status: 'ERROR',
	});
};

const authMiddleWare = async (req, res, next) => {
	const refresh_token = req.headers.token;
	try {
		const { status, message, access_token } = await refreshTokenJwtService(refresh_token);
		console.log(access_token);
		const user = verifyToken(access_token);
		console.log(user);
		if (user?.isAdmin) return next();

		throw new Error('Unauthorized');
	} catch (e) {
		handleErrors(e, res);
	}
};

const authUserMiddleWare = async (req, res, next) => {
	const refresh_token = req.headers.token;
	const userID = req.params.id;

	try {
		const { status, message, access_token } = await refreshTokenJwtService(refresh_token);

		const user = await verifyToken(access_token);

		if (user?.isAdmin || user?.id === userID) return next();

		throw new Error('Unauthorized');
	} catch (e) {
		handleErrors(e, res);
	}
};

module.exports = {
	authMiddleWare,
	authUserMiddleWare,
};

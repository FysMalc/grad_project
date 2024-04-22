const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { refreshTokenJwtService } = require('../services/jwtServices');

dotenv.config();

const authMiddleWare = async (req, res, next) => {
	const refresh_token = req.headers.token;
	console.log(refresh_token);

	const { status, message, access_token } = await refreshTokenJwtService(refresh_token);
	console.log(access_token);
	jwt.verify(access_token, process.env.ACCESS_TOKEN, function (err, user) {
		if (err) {
			return res.status(404).json({
				message: err.message,
				status: 'ERROR',
			});
		}

		if (user?.isAdmin) {
			next();
		} else {
			return res.status(404).json({
				message: 'Unauthorized',
				status: 'ERROR',
			});
		}
	});
};

const authUserMiddleWare = async (req, res, next) => {
	const refresh_token = req.headers.token;
	const userID = req.params.id;

	const { status, message, access_token } = await refreshTokenJwtService(refresh_token);
	jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
		if (err) {
			return res.status(404).json({
				message: err.message,
				status: 'ERROR',
			});
		}

		if (user?.isAdmin || user?.id === userID) {
			next();
		} else {
			return res.status(404).json({
				message: 'Unauthorized',
				status: 'ERROR',
			});
		}
	});
};

module.exports = {
	authMiddleWare,
	authUserMiddleWare,
};

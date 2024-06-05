const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { refreshTokenJwtService } = require('../services/jwtServices');

dotenv.config();

const authMiddleWare = async (req, res, next) => {
	const { authorization } = req.headers;
	console.log('Authorization:', authorization);
	const refresh_token = authorization.split(' ')[1];
	console.log('Refresh_token', refresh_token);

	const { status, message, access_token } = await refreshTokenJwtService(refresh_token);
	console.log('Access_token', access_token);
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
	const { authorization } = req.headers;
	const userID = req.params.id;
	const refresh_token = authorization.split('')[1];
	console.log(refresh_token);

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

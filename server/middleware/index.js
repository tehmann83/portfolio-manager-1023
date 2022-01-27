const admin = require('../config/firebase-config');

class Middleware {
	async decodeToken(req, res, next) {
		console.log('=====>>> req.headers: ', req.headers);

		try {
			const token = req.headers.authorization.split(' ')[1];
			console.log('---> TOKEN: ', token);

			const decodeValue = await admin.auth().verifyIdToken(token);

			console.log('decodeValue:', decodeValue);

			if (decodeValue) {
				return next();
			}
			return res.json({ message: 'Unauthorized' });
		} catch (error) {
			console.log('errrrror', error);
			return res.json({ message: 'middleware Internal Error' });
		}
	}
}

module.exports = new Middleware();

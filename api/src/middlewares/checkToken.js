const { verify } = require('jsonwebtoken');
require('dotenv').config();

const checkToken = async (req, res, next) => {
	
	const header = req.headers['authorization'];
	const token = header && header.split(' ')[1];

	if (!token) return res.status(401).json({ erro: 'Token inválido.' });

	try {
		const { id } = verify(token, process.env.PRIVATE_KEY);
		if (id) req.body.id = id;

		next();
	} catch (error) {
		return res.status(401).json({ erro: 'Token inválido.' });
	}
};

module.exports = checkToken;

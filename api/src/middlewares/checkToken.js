const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkToken = async (req, res, next) => {
  const header = req.headers['authorization']
	const token = header && header.split(' ')[1];

	if (!token) return res.status(401).json({ erro: 'Token inválido.' });

	jwt.verify(token, process.env.PRIVATE_KEY, (erro, decoded) => {
		if (erro) return res.status(401).json({ erro: 'Token inválido.' });
	
		req.body.id = decoded.id;
    next();
	});
};

module.exports = checkToken;

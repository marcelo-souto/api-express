const { verify } = require('jsonwebtoken');
require('dotenv').config();

const tokenController = {
	validate: async (req, res) => {
		const { token } = req.body;
		try {
			verify(token, process.env.PRIVATE_KEY);
			return res.status(200).json(true);
		} catch (error) {
			return res.status(401).json(false);
		}
	}
};

module.exports = tokenController;

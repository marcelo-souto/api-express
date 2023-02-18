const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './api/src/database/database.sqlite'
});

const connectDatabase = async () => {
	try {
		await sequelize.authenticate();
		console.log('banco de dados conectado com sucesso.');
	} catch (error) {
		console.log(error);
	}
};

connectDatabase();

module.exports = sequelize;

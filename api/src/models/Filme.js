const sequelize = require('../database/database.config.js');
const { DataTypes } = require('sequelize');

const Filme = sequelize.define(
	'filmes',
	{
		filmeId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		}
	},
	{
		timestamps: false
	}
);

// Filme.sync({ force: true });

module.exports = Filme;

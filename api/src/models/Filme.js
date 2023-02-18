const sequelize = require('../database/database.js');
const { DataTypes } = require('sequelize');

const Filme = sequelize.define(
	'filmes',
	{
		filmeId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		nome: {
			type: DataTypes.STRING,
			allowNull: false
		},
		sinopse: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	},
	{
		timestamps: false
	}
);

module.exports = Filme;

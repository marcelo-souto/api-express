const sequelize = require('../database/database.config.js');
const { DataTypes } = require('sequelize');

const Sala = sequelize.define(
	'salas',
	{
		salaId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		numero: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
	{
		timestamps: false
	}
);

// Sala.sync({ force: true });

module.exports = Sala;

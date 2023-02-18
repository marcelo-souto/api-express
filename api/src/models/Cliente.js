const sequelize = require('../database/database.config.js');
const { DataTypes } = require('sequelize');

const Cliente = sequelize.define(
	'clientes',
	{
		clienteId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		nome: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		senha: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		timestamps: false
	}
);

// Cliente.sync({ force: true });

module.exports = Cliente;
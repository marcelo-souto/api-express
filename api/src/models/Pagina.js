const sequelize = require('../database/database.js');
const { DataTypes } = require('sequelize');
const Administrador = require('./Administrador.js');

const Pagina = sequelize.define(
	'paginas',
	{
		paginaId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		nome: {
			type: DataTypes.STRING,
			allowNull: false
		},
		conteudo: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		administradorId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Administrador,
				key: 'administradorId'
			}
		}
	},
	{ timestamps: false }
);

Administrador.hasMany(Pagina, { foreignKey: 'administradorId' });
Pagina.hasOne(Administrador, { foreignKey: 'administradorId' });
Pagina.belongsTo(Administrador, { foreignKey: 'administradorId' });

// Pagina.sync({force:true})

module.exports = Pagina;

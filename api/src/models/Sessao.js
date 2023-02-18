const sequelize = require('../database/database.js');
const { DataTypes } = require('sequelize');
const Filme = require('./Filme.js');
const Sala = require('./Sala.js');
const Horario = require('./Horario.js');

const Sessao = sequelize.define(
	'sessoes',
	{
		sessaoId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		filmeId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Filme,
				key: 'filmeId'
			}
		},
		salaId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Sala,
				key: 'salaId'
			}
		},
		horarioId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Horario,
				key: 'horarioId'
			}
		}
	},
	{
		timestamps: false
	}
);

// Traz a sessao com o filme
Sessao.hasOne(Filme, { foreignKey: 'filmeId' });
Sessao.belongsTo(Filme, { foreignKey: 'filmeId' });
// Traz o filme com as sessoes
Filme.hasMany(Sessao, { foreignKey: 'filmeId' });


// Traz a sessao com a sala
Sessao.hasOne(Sala, { foreignKey: 'salaId' });
Sessao.belongsTo(Sala, { foreignKey: 'salaId' });
// Traz a sala com as sessoes
Sala.hasMany(Sessao, { foreignKey: 'salaId' });


// Traz a sessao com o horario
Sessao.hasOne(Horario, { foreignKey: 'horarioId' });
Sessao.belongsTo(Horario, { foreignKey: 'horarioId' });
// Traz o horario com as sessoes
Horario.hasMany(Sessao, { foreignKey: 'horarioId' });

// Sessao.sync({ force: true });

module.exports = Sessao;

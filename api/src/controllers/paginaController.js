const Administrador = require('../models/Administrador.js');
const Pagina = require('../models/Pagina.js');
const validate = require('../functions/validate.js');

const paginaController = {
	create: async (req, res) => {
		const { administradorId, nome, conteudo } = req.body;

		try {
			const administrador = await Administrador.findByPk(administradorId);
			if (!administrador)
				return res.status(404).json({ erro: 'Administrador não encontrado.' });

			validate({ 'nome da página': nome, isRequired: true });
			validate({ conteudo, isRequired: true });

			const pagina = await Pagina.create({
				administradorId: administrador.administradorId,
				conteudo: conteudo,
				nome: nome
			});

			return res.status(200).json({ mensagem: 'Conteúdo criado com suceso.' });
		} catch (erro) {
			return res.status(400).json({ erro: erro.message });
		}
	},
	update: async (req, res) => {

		const { administradorId, nome, conteudo, paginaId } = req.body;

		try {

			if (!nome && !conteudo) return res.status(400).json({ erro: 'O conteudo enviado deve ser diferente do atual.' })

			if (!administradorId || !paginaId) return res.status(400).json({ erro: 'Falta informaçõo na sua requisição' })

			const administrador = await Administrador.findByPk(administradorId);
			if (!administrador)
				return res.status(404).json({ erro: 'Administrador não encontrado.' });

			const pagina = await Pagina.findByPk(paginaId);
			if (!pagina)
				return res.status(404).json({ erro: 'Página não encontrada.' });

			if (nome === pagina.nome || conteudo === pagina.conteudo) return res.status(400).json({ erro: 'O conteudo enviado deve ser diferente do atual.' })

			validate({ 'nome da página': nome });
			validate({ conteudo });

			const paginaAtualizada = await pagina.update({
				administradorId: administrador.administradorId,
				conteudo: conteudo ? conteudo : pagina.conteudo,
				nome: nome ? nome : pagina.nome
			});

			return res.status(200).json({ mensagem: 'Pagina atualizada com sucesso.' });
		} catch (erro) {
			return res.status(400).json({ erro: erro.message });
		}
	},
	getAll: async (req, res) => {
		const { administradorId } = req.body;

		try {
			const paginas = await Pagina.findAll({
				where: {
					administradorId: administradorId
				}
			});

			return res.status(200).json(paginas);
		} catch (erro) {
			return res.status(400).json({ erro: erro.message });
		}
	},
	getByNome: async (req, res) => {
		const { nome } = req.params

		try {
			const pagina = await Pagina.findOne({
				where: {
					nome: nome
				}
			});

			if (!pagina)
				return res.status(404).json({ erro: 'Página não encontrada.' });

			return res.status(200).json(pagina);
		} catch (erro) {
			return res.status(400).json({ erro: erro.message });
		}
	},
	getById: async (req, res) => {
		const { paginaId } = req.params

		try {
			const pagina = await Pagina.findByPk(paginaId);

			if (!pagina)
				return res.status(404).json({ erro: 'Página não encontrada.' });

			return res.status(200).json(pagina);
		} catch (erro) {
			return res.status(400).json({ erro: erro.message });
		}
	},
	delete: async (req, res) => {
		const { paginaId } = req.params;
		const { administradorId } = req.body;

		try {
			const administrador = await Administrador.findByPk(administradorId);
			if (!administrador)
				return res.status(404).json({ erro: 'Administrador não encontrado.' });

			const pagina = await Pagina.findByPk(paginaId);
			if (!pagina)
				return res.status(404).json({ erro: 'Página não encontrada.' });

			if (pagina.administradorId !== administrador.administradorId)
				return res.status(401).json({ erro: 'Não autorizado.' });

			const paginaDeletada = await pagina.destroy();

			return res.status(200).json({ mensagem: 'Pagina deletada.' });
		} catch (erro) {
			return res.status(400).json({ erro: erro.message });
		}
	}
};

module.exports = paginaController;

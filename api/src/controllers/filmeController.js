const Administrador = require('../models/Administrador.js');
const Filme = require('../models/Filme.js');
const Genero = require('../models/Genero.js');
const Sessao = require('../models/Sessao.js');
const validate = require('../functions/validate.js');
const imageUploadHandle = require('../functions/imageUploadHandle.js');
const { unlink } = require('fs/promises');
const fetch = require('node-fetch');

// ==== CAMPOS ====
// nome
// sinopse
// dataEstreia
// poster
// disponivel3D
// disponivelLegendado

// ==== DEPENDE DE ====
// generoId
// administradorId

const filmeController = {
	create: async (req, res) => {
		let {
			administradorId: id,
			nome,
			sinopse,
			dataEstreia,
			poster,
			disponivel3D: d3D,
			disponivelLegendado: dLG,
			generoId
		} = req.body;

		try {
			// Checanco se o adm existe
			const administrador = await Administrador.findByPk(id);
			if (!administrador) throw new Error('Você não tem permissão');

			// Validando os campos
			validate({ nome, isRequired: true });
			nome = nome.trim().toLowerCase();

			validate({ sinopse, isRequired: true });
			validate({
				'data de estreia': dataEstreia,
				type: 'data',
				isRequired: true
			});
			validate({ 'disponível em 3D': d3D, type: 'boolean', isRequired: true });
			validate({
				'disponível legendado': dLG,
				type: 'boolean',
				isRequired: true
			});
			validate({ 'id do genero': generoId, type: 'numero', isRequired: true });

			// Checando se o filme ja existe
			const filmeJaExiste = await Filme.findOne({ where: { nome: nome } });
			if (filmeJaExiste) throw new Error('Filme já cadastrado.');

			// Checando se o genero existe
			const genero = await Genero.findByPk(generoId);
			if (!genero) throw new Error('Genero não encontrado.');

			// Checando se poster veio como link
			if (poster !== undefined) {
				const validated = validate({ poster, isRequired: true });

				// Checar se a imagem existe
				let response;
				try {
					response = await fetch(poster);
					if (!response.ok) throw new Error();
				} catch (error) {
					if (error)
						return res.status(400).json({ erro: 'Link de imagem invalido.' });
				}

				if (validated) {
					const link = poster.split('/');
					const img = link.pop();
					poster = {
						url: link.join('/') + '/',
						img: img,
						alt: `Filme ${nome}`
					};
				}
			}

			// Checando se veio como arquivo de imagem e fazendo tratamento
			if (req.file) {
				const file = await imageUploadHandle(req.file);
				if (file) {
					poster = {
						url: null,
						img: file,
						alt: `Filme ${nome}`
					};
				}
			}

			// Criando o novo filme
			const filme = await Filme.create({
				administradorId: administrador.administradorId,
				nome,
				sinopse,
				dataEstreia,
				poster,
				disponivel3D: d3D,
				disponivelLegendado: dLG,
				generoId
			});

			return res.status(200).json(filme);
		} catch (erro) {

			if (req.file) await unlink(req.file.path) 
			return res.status(400).json({ erro: erro.message });
		}
	},
	getAll: async (req, res) => {
		let queries;
		if (req.url.includes('include'))
			queries = req.url.replaceAll('include=', '').split('?')[1].split('&');

		const includesQuery = {
			genero: {
				model: Genero,
				as: 'genero'
			},
			sessoes: {
				model: Sessao,
				as: 'sessoes'
			}
		};

		try {
			const filmes = await Filme.findAll(
				queries && {
					include: queries.filter((query) => includesQuery[query])
				}
			);

			return res.status(200).json(filmes);
		} catch (erro) {
			return res.status(400).json({ erro: erro.message });
		}
	},
	getById: async (req, res) => {
		const { filmeId } = req.params;

		let queries;
		if (req.url.includes('include'))
			queries = req.url.replaceAll('include=', '').split('?')[1].split('&');

		const includesQuery = {
			genero: {
				model: Genero,
				as: 'genero'
			},
			sessoes: {
				model: Sessao,
				as: 'sessoes'
			}
		};

		try {
			const filme = await Filme.findByPk(
				filmeId,
				queries && {
					include: queries.filter((query) => includesQuery[query])
				}
			);

			return res.status(200).json(filme);
		} catch (erro) {
			return res.status(400).json({ erro: erro.message });
		}
	}
};

module.exports = filmeController;

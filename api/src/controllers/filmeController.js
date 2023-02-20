const Administrador = require('../models/Administrador.js');
const Filme = require('../models/Filme.js');
const Genero = require('../models/Genero.js');
const validate = require('../functions/validate.js');
const imageUploadHandle = require('../functions/imageUploadHandle.js');
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
			if (!administrador)
				return res.status(404).json({ erro: 'Você não tem permissão' });

			// Validando os campos
			validate({ nome, isRequired: true });
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

			// Checando se o genero existe
			const genero = await Genero.findByPk(generoId);
			if (!genero)
				return res.status(404).json({ erro: 'Genero não encontrado.' });

			// Checando se poster veio como link
			if (poster !== undefined) {
				const validated = validate({ poster, isRequired: true });

				// Checar se a imagem existe
				let response;
				try {
					response = await fetch(poster);
					if (!response.ok) throw new Error();

				} catch (error) {
					if (error) return res.status(400).json({ erro: 'Link de imagem invalido.' });
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
			return res.status(400).json({ erro: erro.message });
		}
	}
};

module.exports = filmeController;

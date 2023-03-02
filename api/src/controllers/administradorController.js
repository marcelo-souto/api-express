const Administrador = require('../models/Administrador.js');
const { Op } = require('sequelize');
const validate = require('../functions/validate.js');

const { hash, compare } = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');

const dotenv = require('dotenv');

dotenv.config();

const administradorController = {
	create: async (req, res) => {
		const { nome, email, senha } = req.body;

		try {
			validate({ nome, isRequired: true });
			validate({ email, type: 'email', isRequired: true });
			validate({ senha, type: 'senha', isRequired: true });

			const administradorJaExiste = await Administrador.findOne({
				where: {
					email: `${email}`
				}
			});

			if (administradorJaExiste) throw new Error('Usuário já cadastrado.');

			const senhaCriptografada = await hash(senha, 10);

			const administrador = await Administrador.create({
				nome,
				email,
				senha: senhaCriptografada
			});

			return res.status(201).json(administrador);
		} catch (erro) {
			return res.status(400).json({ erro: erro.message });
		}
	},
	auth: async (req, res) => {
		const { email, senha } = req.body;

		try {
			if (!email || !senha) throw new Error('Email e senha são obrigatórios.');

			const administrador = await Administrador.findOne({
				where: {
					email: `${email}`
				}
			});

			if (!administrador)
				return res.status(404).json({ erro: 'Usuário não encontrado.' });

			const resultado = await compare(senha, administrador.senha);

			if (!resultado) throw new Error('Usuário ou senha inválida.');

			const token = sign(
				{ administradorId: administrador.administradorId },
				process.env.PRIVATE_KEY,
				{ expiresIn: '1d' }
			);

			return res
				.status(200)
				.json({ mensagem: 'Login realizado com sucesso', token });
		} catch (erro) {
			return res.status(400).json({ erro: erro.message });
		}
	},
	getInfo: async (req, res) => {
		const { administradorId: id } = req.body;

		try {
			const administrador = await Administrador.findByPk(id, {
				attributes: {
					exclude: ['senha', 'emailVerificado']
				}
			});

			if (!administrador)
				return res.status(404).json({ erro: 'Usuário não encontrado.' });

			return res.status(200).json(administrador);
		} catch (erro) {
			return res.status(400).json({ erro: erro.message });
		}
	},
	update: async (req, res) => {
		const { administradorId: id, email, nome } = req.body;

		if (!email && !nome)
			return res.status(400).json({
				erro: 'Não foram enviadas informações para serem atualizadas.'
			});

		try {
			const administrador = await Administrador.findByPk(id);

			if (!administrador)
				return res.status(404).json({ erro: 'Usuário não encontrado.' });

			if (administrador.email === email)
				return res.status(400).json({
					erro: 'A informação a ser atualizada deve ser diferente da atual.'
				});

			validate({ nome });
			validate({ email, type: 'email' });

			const emailJaCadastrado = await Administrador.findOne({
				where: {
					email: `${email}`
				}
			});

			if (emailJaCadastrado)
				return res.status(400).json({ erro: 'Email já cadastrado.' });

			await administrador.update({
				nome: nome ? nome : administrador.nome,
				email: email ? email : administrador.email
			});

			return res
				.status(201)
				.json({ mensagem: `Informações atualizadas com sucesso.` });
		} catch (erro) {
			return res.status(400).json({ erro: erro.message });
		}
	},
	delete: async (req, res) => {
		const { administradorId: id } = req.body;

		try {
			const administrador = await Administrador.findByPk(id);

			if (!administrador)
				return res.status(404).json({ erro: 'Usuário não encontrado.' });

			const administradorDeletado = await administrador.destroy();

			return res.status(200).json({
				mensagem: `Cadastro do usuário ${administradorDeletado.nome} excluido com sucesso.`
			});
		} catch (erro) {
			return res.status(400).json({ erro: erro.message });
		}
	},
	changePassword: async (req, res) => {
		const { administradorId, senha, novaSenha, confirmacaoNovaSenha } =
			req.body;

		try {
			validate({ senha, type: 'senha', isRequired: true });
			validate({ 'senha nova': novaSenha, type: 'senha', isRequired: true });

			const administrador = await Administrador.findByPk(administradorId);
			if (!administrador)
				return res.status(404).json({ erro: 'Usuário não encontrado.' });

			const resultado = await compare(senha, administrador.senha);
			if (!resultado) return res.status(400).json({ erro: 'Senha incorreta.' });

			if (novaSenha !== confirmacaoNovaSenha)
				return res.status(400).json({ erro: 'As senhas precisam ser iguais.' });

			if (senha === novaSenha)
				return res
					.status(400)
					.json({ erro: 'A senha nova deve ser diferente da atual' });

			const novaSenhaCriptografada = await hash(novaSenha, 10);

			await administrador.update({
				senha: novaSenhaCriptografada
			});

			const token = sign(
				{ administradorId: administrador.administradorId },
				process.env.PRIVATE_KEY,
				{ expiresIn: '1d' }
			);

			return res
				.status(200)
				.json({ mensagem: 'Senha atualizada com sucesso.', token });
		} catch (erro) {
			return res.status(400).json({ erro: erro.message });
		}
	}
};

module.exports = administradorController;

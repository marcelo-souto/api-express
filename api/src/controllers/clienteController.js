const Cliente = require('../models/Cliente.js')
const Token = require('../models/Token.js')
const validate = require('../functions/validate.js')
const nodemailer = require('nodemailer')
const mailer = require('../smtp/smtp.js')
const jwt = require('jsonwebtoken');
const { hash, compare } = require('bcrypt')
require('dotenv').config();

const transporter = nodemailer.createTransport({

    host:mailer.host,
    port:mailer.port,
    secure:false,
    auth:{
        user:mailer.user,
        pass:mailer.pass
    },
    tls:{
        rejectUnauthorized:false,
    }
});

const clienteController = {

    post:async(req,res)=>{
        
        const {nome,email,senha,emailVerificado}= req.body

        try {     
          
            validate({nome:nome, isRequired:true});
            validate({email:email, type:'email', isRequired:true});
            validate({senha:senha, type:'senha', isRequired:true});



            const cliente = await  Cliente.findOne({where:{email}})
          
            if(cliente) throw new Error('Email já cadastrado')

            const data = await Cliente.create({
                nome,
                email,
                senha,
                emailVerificado:false
            })

            const newToken = jwt.sign(
				{ id: data.clienteId},
				process.env.PRIVATE_KEY,
				{ expiresIn: '1d' }
			);

            const tokenClient = await Token.create({
                clienteId:data.clienteId,
                token:newToken
            })

            const emailCliente = await transporter.sendMail({
                text:"Autenticação",
                subject: "Validação para login",
                from:`Cinema <nodecinemapc@gmail.com>`,
                to:`${email}`,
                html:`<html>
                <body>
                    <strong>Para validar sua conta:</strong>.
                    <a href="http://localhost:3000/cliente/att/?teste=${newToken}">Click aqui</a>
                </body>
                </html>`
            })


            return res.status(201).json(data)

        } catch (error) {
            return res.json({error: error.message})
        }
    },

	auth: async (req, res) => {
		const { email, senha } = req.body;

		try {
			if (!email || !senha) throw new Error('Email e senha são obrigatórios.');

			const cliente = await Cliente.findOne({
				where: {
					email: email
				}
			});

			console.log(cliente)

			if (!cliente)
				return res.status(404).json({ erro: 'Usuário não encontrado.' });


			if (senha !== cliente.senha) throw new Error('Usuário ou senha inválida.');

			const token = jwt.sign(
				{ id: cliente.clienteId },
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

    getAutenticate:async(req,res) =>{

        try {
            const token = req.query.teste

            const {id} = jwt.verify(token, process.env.PRIVATE_KEY);
            
            const cliente = await  Cliente.findByPk(id)

            if(cliente.emailVerificado == false) {
                await cliente.update({
                emailVerificado:true
                })
                console.log('Usuário verificado')
            }else{
                console.log('Link invalido')
            }

            console.log(id)
            return  res.json(id)

        } catch (erro) {
            return res.json({error: error.message})
        }
        
    },

    getInfo: async (req, res) => {
		const { id } = req.body;

		try {
			const cliente = await Cliente.findByPk(id, {
				attributes: {
					exclude: ['senha', 'emailVerificado']
				}
			});

			if (!cliente)
				return res.status(404).json({ erro: 'Usuário não encontrado.' });

			return res.status(200).json(cliente);
		} catch (erro) {
			return res.status(400).json({ erro: erro.message });
		}
	},

    update: async (req, res) => {
		const { id, email, nome } = req.body;

		if (!email && !nome)
			return res.status(400).json({
				erro: 'Não foram enviadas informações para serem atualizadas.'
			});

		try {
			const cliente = await Cliente.findByPk(id);

			if (!cliente)
				return res.status(404).json({ erro: 'Usuário não encontrado.' });

			if (cliente.email === email)
				return res.status(400).json({
					erro: 'A informação a ser atualizada deve ser diferente da atual.'
				});

			validate({ nome });
			validate({ email, type: 'email' });

			const emailJaCadastrado = await cliente.findOne({
				where: {
					email: `${email}`
				}
			});

			if (emailJaCadastrado)
				return res.status(400).json({ erro: 'Email já cadastrado.' });

			await cliente.update({
				nome: nome ? nome : cliente.nome,
				email: email ? email : cliente.email
			});

			return res
				.status(201)
				.json({ mensagem: `Informações atualizadas com sucesso.` });
		} catch (erro) {
			return res.status(400).json({ erro: erro.message });
		}
	},

    delete:async(req,res) =>{

        const { id } = req.body;

		try {
			const cliente = await Cliente.findByPk(id);

			if (!cliente)
				return res.status(404).json({ erro: 'Usuário não encontrado.' });

			const clienteDeletado = await cliente.destroy();

			return res.status(200).json({
				mensagem: `Cadastro do usuário ${clienteDeletado.nome} excluido com sucesso.`
			});
		} catch (erro) {
			return res.status(400).json({ erro: erro.message });
		}
	
    }
}

module.exports = clienteController
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const administradorRoutes = require('./routes/administradorRoutes.js');
const tokenRoutes = require('./routes/tokenRoutes.js');
const paginaRoutes = require('./routes/paginaRoutes');

// Variaveis
const port = process.env.PORT;
const server = express();

// Middlewares
server.use(cors());
server.use(express.json());

// Rotas
server.use('/', administradorRoutes);
server.use('/', tokenRoutes);
server.use('/', paginaRoutes);

server.get('/', (req, res) => {
	return res.send('<h1>Servidor rodando ...<h1>');
});

server.listen(port, () => {
	console.log(`Servidor rodando na porta ${port} ...`);
});

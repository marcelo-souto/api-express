const express = require('express')
const logger = require('./functions/logger.js')
const dotenv = require('dotenv')
const router = require('./routes/clienteRoute.js')

dotenv.config()

const administradorRoutes = require('./routes/administradorRoutes.js');
const filmeRoutes = require('./routes/filmeRoutes.js');

// Variaveis
const port = process.env.PORT;
const server = express();

// Middlewares
server.use(express.json());
server.use(logger);

// Rotas
server.use('/', administradorRoutes);
server.use('/', filmeRoutes);
server.use('/', router)

server.get('/', (req, res) => {
	return res.send('<h1>Servidor rodando ...<h1>');
});

server.listen(port, () => {
	console.log(`Servidor rodando na porta ${port} ...`);
});

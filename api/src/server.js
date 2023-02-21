const express = require('express')
const logger = require('./functions/logger.js')
const dotenv = require('dotenv')


dotenv.config()

const administradorRoutes = require('./routes/administradorRoutes.js');
const filmeRoutes = require('./routes/filmeRoutes.js');
const clienteRoutes = require('./routes/clienteRoute.js')

// Variaveis
const port = process.env.PORT;
const server = express();

// Middlewares
server.use(express.json());
server.use(logger);

// Rotas
server.use('/', administradorRoutes);
server.use('/', filmeRoutes);
server.use('/', clienteRoutes)

server.get('/', (req, res) => {
	return res.send('<h1>Servidor rodando ...<h1>');
});

server.listen(port, () => {
	console.log(`Servidor rodando na porta ${port} ...`);
});

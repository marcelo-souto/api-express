const express = require('express')
const logger = require('./functions/logger.js')
const dotenv = require('dotenv')
dotenv.config()

const port = process.env.port
const server = express()

server.use(express.json())
server.use(logger)

server.get('/', (req, res) => {
  return res.send('<h1>Servidor rodando ...<h1>')
})

server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port} ...`)
})
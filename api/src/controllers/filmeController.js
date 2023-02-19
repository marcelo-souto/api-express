const Filme = require('../models/Filme.js')

const filmeController = {
  create: async (req, res) => {
    return res.send('Rota conectada')
  }
}

module.exports = filmeController
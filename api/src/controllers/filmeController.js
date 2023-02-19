const Filme = require('../models/Filme.js')

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
    return res.send('Rota conectada')
  }
}

module.exports = filmeController
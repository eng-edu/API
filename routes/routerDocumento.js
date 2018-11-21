'use strict';

const express = require('express')
const router = express.Router()

//controller
const manterDocumento = require('../controllers/manterDocumento')

//rotas
router.get('/:ID', manterDocumento.get)
router.post('/:JSON', manterDocumento.post)
router.put('/:ID/:NOME/:CAMINHO/:ETAPA_ID/:ETAPA_ARCO_ID', manterDocumento.put)
router.delete('/:ID', manterDocumento.delet)
router.get('/list', manterDocumento.get)




//exporta o modulo
module.exports = router


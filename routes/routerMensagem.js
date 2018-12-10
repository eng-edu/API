'use strict';

const express = require('express')
const router = express.Router()

//controller
const manterMensagem = require('../controllers/manterMensagem')

//rotas
router.post('/:TEXTO/:ID_AUTOR/:NOME_AUTOR/:DATA/:ARCO_ID', manterMensagem.post)

//exporta o modulo
module.exports = router


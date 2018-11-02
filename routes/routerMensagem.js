'use strict';

const express = require('express')
const router = express.Router()

//controller
const manterMensagem = require('../controllers/manterMensagem')

//rotas
router.get('/:ID', manterMensagem.get)
router.post('/:TEXTO/:IDAUTOR/:DATA/:ARCO_ID', manterMensagem.post)
router.put('/:ID/:TEXTO/:IDAUTOR/:DATA/:ARCO_ID', manterMensagem.put)
router.delete('/:ID', manterMensagem.delet)
router.get('/list', manterMensagem.get)

//exporta o modulo
module.exports = router


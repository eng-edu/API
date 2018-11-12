'use strict';

const express = require('express')
const router = express.Router()

//controller
const manterArco = require('../controllers/manterArco4')

//rotas
router.get('/solicitacoes', manterArco.get)


//exporta o modulo
module.exports = router

